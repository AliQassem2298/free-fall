// Physics.js
import * as THREE from "three";
// الثوابت (قابلة للتعديل من خلال الواجهة)
const defaultConfig = {
  // البيئة (بيئة المحاكاة)
  rho: 1.225,                 // كثافة الهواء (kg/m^3)
  g: 9.81,                    // تسارع الجاذبية (m/s^2)
  wind: new THREE.Vector3(0, 0, 0), // متجه الرياح (m/s)

  // الكتلة (Mass)
  mass: 90,                   // الكتلة الإجمالية (kg)

  // الديناميكا الهوائية (Aerodynamics)
  Cd_body: 1.0,               // معامل السحب (الشخص أثناء السقوط الحر)
  Cd_canopy: 1.0,             // ✅ تم تغييره من 2 إلى 1
  A_body: 0.7,                // مساحة السطح (الشخص)
  A_canopy: 5,               // مساحة السطح (المظلة)

  // الرفع (Lift)
  Cl: 1.0,                    // معامل الرفع (تحت المظلة)

  // فتح المظلة (Parachute opening)
  T_open: 3.0,                // وقت فتح المظلة (ثواني)
  openTime: 0,                // الوقت المنقضي منذ فتح المظلة
  openProgress: 0,            // تقدم فتح المظلة (0-1)

  // التباطؤ النهائي (Final deceleration)
  decelerationThreshold: 20,  // ارتفاع التباطؤ النهائي (المتر)
  decelerationBoost: 0.5,     // معامل الزيادة للتباطؤ النهائي (0-1)

  // مستوى الأرض
  groundY: 1000                 // مستوى الأرض (لا توجد مرحلة "ملامسة الأرض")
};

// الحالة الحالية للمحاكاة
const state = {
  position: new THREE.Vector3(0, 0, 0), // الموقع الابتدائي (متر)
  velocity: new THREE.Vector3(0, 0, 0),    // السرعة الابتدائية (متر/ثانية)
  acceleration: new THREE.Vector3(0, 0, 0), // التسارع الابتدائي (متر/ثانية^2)
  time: 0,                                 // الزمن (ثواني)
  phase: "سقوط حر",                        // المرحلة الحالية
  openProgress: 0,                         // تقدم فتح المظلة (0-1)
};

// بيانات الواجهة
const telemetry = {
  time: 0,
  altitude: 0,
  speed: 0,
  verticalSpeed: 0,
  horizontalSpeed: 0,
  kineticEnergy: 0,
  potentialEnergy: 0,
  dynamicPressure: 0,
  dragForce: 0,
  liftForce: 0,
  weight: 0,
  terminalVelocity: 0
};

// حساب قوة السحب
function calculateDragForce() {
  const vRel = state.velocity.clone().sub(config.wind); // السرعة النسبية
  const speedRel = vRel.length();
  const q = 0.5 * config.rho * speedRel * speedRel; // الضغط الديناميكي
  const CdA_body = config.Cd_body * config.A_body;
  const CdA_canopy = config.Cd_canopy * config.A_canopy;
  const CdA = CdA_body + (CdA_canopy - CdA_body) * state.openProgress;
  const dragForce = vRel.clone().multiplyScalar(-q * CdA / (speedRel || 1));
  return dragForce;
}

// حساب قوة الرفع (عمودية على السرعة النسبية، في الطائرة العمودية)
function calculateLiftForce() {
  const vRel = state.velocity.clone().sub(config.wind);
  const speedRel = vRel.length();

  if (speedRel === 0) return new THREE.Vector3(0, 0, 0);

  // الاتجاه العمودي (نستخدم اتجاه الأفقي كمرجع)
  const horizontal = new THREE.Vector3(vRel.x, 0, vRel.z);
  if (horizontal.length() === 0) return new THREE.Vector3(0, 0, 0);

  const liftDir = horizontal.normalize(); // الاتجاه الأفقي هو اتجاه القوة الرأسية (مثلاً)
  const q = 0.5 * config.rho * speedRel * speedRel;
  const ClA = config.Cl * config.A_canopy * state.openProgress; // فقط تحت المظلة
  const liftMagnitude = q * ClA;
  return liftDir.multiplyScalar(liftMagnitude);
}

// حساب السرعة الحدّية
function calculateTerminalVelocity() {
  const CdA_body = config.Cd_body * config.A_body;
  const CdA_canopy = config.Cd_canopy * config.A_canopy;
  const dragCoeff = state.phase === "سقوط حر" ? CdA_body : CdA_canopy;
  return Math.sqrt((2 * config.mass * config.g) / (config.rho * dragCoeff));
}

// حساب الطاقة الحركية
function calculateKineticEnergy() {
  return 0.5 * config.mass * state.velocity.lengthSq();
}

// حساب الطاقة الكامنة
function calculatePotentialEnergy() {
  return config.mass * config.g * Math.max(0, state.position.y - config.groundY);
}

// تحديث حالة المحاكاة لكل خطوة زمنية
function updatePhysics(dt) {
  state.time += dt;

  // تحديث تقدم فتح المظلة والمرحلة
  if (state.phase === "فتح المظلة") {
    state.openProgress += dt / config.T_open;
    if (state.openProgress >= 1) {
      state.phase = "تحت المظلة";
      state.openProgress = 1;
    }
  }

  // التباطؤ النهائي (زيادة السحب قرب الأرض)
  let decelerationBoost = 1;
  if (state.position.y <= config.decelerationThreshold && state.phase === "تحت المظلة") {
    decelerationBoost = 1 + config.decelerationBoost;
  }

  // حساب القوى
  const dragForce = calculateDragForce();
  const liftForce = calculateLiftForce();
  const weight = config.mass * config.g;

  // القوة الإجمالية (بما في ذلك الجاذبية، السحب، الرفع)
  const totalForce = new THREE.Vector3(0, -weight, 0).add(dragForce.clone().multiplyScalar(decelerationBoost)).add(liftForce);

  // التسارع
  state.acceleration.copy(totalForce).multiplyScalar(1 / config.mass);

  // التحديث (شبه-أويلر)
  state.velocity.addScaledVector(state.acceleration, dt);
  state.position.addScaledVector(state.velocity, dt);

  // التوقف عند الوصول إلى الارتفاع 0
  if (state.position.y <= config.groundY) {
    state.position.y = 1000;
    state.velocity.set(0, 0, 0);
    state.acceleration.set(0, 0, 0);

    // ✅ السرعة الحدية تصبح 0 عند التوقف
    telemetry.terminalVelocity = 0;
  }

  // تحديث بيانات الواجهة
  telemetry.time = state.time;
  telemetry.altitude = Math.max(0, state.position.y);
  telemetry.speed = state.velocity.length();
  telemetry.verticalSpeed = Math.abs(state.velocity.y);
  telemetry.horizontalSpeed = new THREE.Vector3(state.velocity.x, 0, state.velocity.z).length();
  telemetry.kineticEnergy = calculateKineticEnergy();
  telemetry.potentialEnergy = calculatePotentialEnergy();
  telemetry.dynamicPressure = 0.5 * config.rho * state.velocity.lengthSq();
  telemetry.dragForce = dragForce.length();
  telemetry.liftForce = liftForce.length();
  telemetry.weight = weight;

  // لا تحسب terminalVelocity إذا كنا متوقفين
  if (state.position.y > 0) {
    telemetry.terminalVelocity = calculateTerminalVelocity();
  }
}

// بدء عملية فتح المظلة
function openParachute() {
  if (state.phase === "سقوط حر") {
    state.phase = "فتح المظلة";
    state.openProgress = 0;
  }
}

// الحلقة الرئيسية لتحديث المحاكاة
function step(dt) {
  updatePhysics(dt);
}

// عرض المعاملات للواجهة
const config = defaultConfig;

// إعادة تعيين المحاكاة
function resetSimulation() {
  state.position.set(0, 1000, 0);
  state.velocity.set(0, 0, 0);
  state.acceleration.set(0, 0, 0);
  state.time = 0;
  state.phase = "سقوط حر";
  state.openProgress = 0;

  Object.assign(config, defaultConfig);

  console.log('تمت إعادة تعيين المحاكاة');
}

// تصدير كل شيء
export {
  state,
  telemetry,
  config,
  step,
  updatePhysics,
  openParachute,
  resetSimulation
};