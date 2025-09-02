// // // تعديل المعايير

// // // gui/config-gui.js

// import * as dat from 'lil-gui'; // ✅ Modern, lightweight
// // 
// import { config, state, resetSimulation } from '../Physics.js';

// export class ConfigGUI {
//   constructor() {
//     // Position on the right side of the screen
//     this.gui = new dat.GUI({
//       title: 'Config (Inputs)',
//       container: document.body,
//       autoPlace: false
//     });

//     // Create a container for the GUI and position it on the right
//     const container = document.createElement('div');
//     container.style.position = 'fixed';
//     container.style.top = '10px';
//     container.style.right = '10px'; // Position on the right side
//     container.style.zIndex = '1000';
//     container.appendChild(this.gui.domElement);
//     document.body.appendChild(container);

//     this.controllers = {};

//     // Add folders for organization
//     const env = this.gui.addFolder('Environment');
//     this.controllers.rho = env.add(config, 'rho', 0.5, 2).name('Air Density').onChange(() => {
//       console.log(`Updated Air Density to: ${config.rho}`);
//     });

//     this.controllers.g = env.add(config, 'g', 0, 20).name('Gravity').onChange(() => {
//       console.log(`Updated Gravity to: ${config.g}`);
//     });

//     const mass = this.gui.addFolder('Mass');
//     this.controllers.mass = mass.add(config, 'mass', 1, 200).name('Body Mass').onChange(() => {
//       console.log(`Updated Body Mass to: ${config.mass}`);
//     });

//     const aero = this.gui.addFolder('Aerodynamics');
//     this.controllers.Cd_body = aero.add(config, 'Cd_body', 0.5, 2).name('Cd Body').onChange(() => {
//       console.log(`Updated Cd Body to: ${config.Cd_body}`);
//     });

//     this.controllers.Cd_canopy = aero.add(config, 'Cd_canopy', 0.5, 2).name('Cd Canopy').onChange(() => {
//       console.log(`Updated Cd Canopy to: ${config.Cd_canopy}`);
//     });

//     this.controllers.A_body = aero.add(config, 'A_body', 0.1, 2).name('Area Body').onChange(() => {
//       console.log(`Updated Area Body to: ${config.A_body}`);
//     });

//     this.controllers.A_canopy = aero.add(config, 'A_canopy', 5, 50).name('Area Canopy').onChange(() => {
//       console.log(`Updated Area Canopy to: ${config.A_canopy}`);
//     });

//     const lift = this.gui.addFolder('Lift');
//     this.controllers.Cl = lift.add(config, 'Cl', 0, 3).name('Lift Coefficient').onChange(() => {
//       console.log(`Updated Lift Coefficient to: ${config.Cl}`);
//     });

//     const chute = this.gui.addFolder('Parachute Opening');
//     this.controllers.T_open = chute.add(config, 'T_open', 0.1, 5).name('Open Time').onChange(() => {
//       console.log(`Updated Open Time to: ${config.T_open}`);
//     });

//     const ground = this.gui.addFolder('Ground Contact');
//     this.controllers.k = ground.add(config, 'k', 1000, 100000).name('Spring Constant').onChange(() => {
//       console.log(`Updated Spring Constant to: ${config.k}`);
//     });

//     this.controllers.c = ground.add(config, 'c', 100, 20000).name('Damper Constant').onChange(() => {
//       console.log(`Updated Damper Constant to: ${config.c}`);
//     });

//     this.controllers.stickEps = ground.add(config, 'stickEps', 0, 1).name('Stop Speed').onChange(() => {
//       console.log(`Updated Stop Speed to: ${config.stickEps}`);
//     });

//     // Add reset button
//     this.gui.add({ reset: () => this.resetSimulation() }, 'reset').name('Reset Simulation');

//     this.gui.open();
//   }

//   resetSimulation() {
//     if (typeof resetSimulation === 'function') {
//       resetSimulation();
//       console.log('Simulation reset');

//       // Update all controllers to reflect new values
//       for (const key in this.controllers) {
//         if (this.controllers[key] && this.controllers[key].updateDisplay) {
//           this.controllers[key].updateDisplay();
//         }
//       }
//     } else {
//       console.error('resetSimulation function not available');
//     }
//   }
// }



// gui/config-gui.js

import * as dat from 'lil-gui';
import { config, state, resetSimulation } from '../Physics.js';

export class ConfigGUI {
  constructor() {
    this.gui = new dat.GUI({
      title: 'الإعدادات (المدخلات)',
      container: document.body,
      autoPlace: false
    });

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.zIndex = '1000';
    container.appendChild(this.gui.domElement);
    document.body.appendChild(container);

    this.controllers = {};

    const env = this.gui.addFolder('البيئة');
    this.controllers.rho = env.add(config, 'rho', 0.5, 2).name('كثافة الهواء').onChange(() => {
      console.log(`تم تحديث كثافة الهواء إلى: ${config.rho}`);
    });

    this.controllers.g = env.add(config, 'g', 0, 20).name('الجاذبية').onChange(() => {
      console.log(`تم تحديث الجاذبية إلى: ${config.g}`);
    });

    // إضافة الرياح
    const wind = env.addFolder('الرياح');
    wind.add(config.wind, 'x', -5, 5, 0.1).name('الرياح X (أفقية)').onChange(() => {
      console.log(`رياح X: ${config.wind.x}`);
    });
    wind.add(config.wind, 'y', -5, 5, 0.1).name('الرياح Y (عمودية)').onChange(() => {
      console.log(`رياح Y: ${config.wind.y}`);
    });
    wind.add(config.wind, 'z', -5, 5, 0.1).name('الرياح Z (أفقية)').onChange(() => {
      console.log(`رياح Z: ${config.wind.z}`);
    });

    const mass = this.gui.addFolder('الكتلة');
    this.controllers.mass = mass.add(config, 'mass', 1, 200).name('كتلة الجسم').onChange(() => {
      console.log(`تم تحديث كتلة الجسم إلى: ${config.mass}`);
    });

    const aero = this.gui.addFolder('الديناميكا الهوائية');
    this.controllers.Cd_body = aero.add(config, 'Cd_body', 0.5, 2).name('معامل السحب (الجسم)').onChange(() => {
      console.log(`تم تحديث معامل السحب (الجسم) إلى: ${config.Cd_body}`);
    });

    this.controllers.Cd_canopy = aero.add(config, 'Cd_canopy', 0.5, 2).name('معامل السحب (المظلة)').onChange(() => {
      console.log(`تم تحديث معامل السحب (المظلة) إلى: ${config.Cd_canopy}`);
    });

    this.controllers.A_body = aero.add(config, 'A_body', 0.1, 2).name('مساحة الجسم').onChange(() => {
      console.log(`تم تحديث مساحة الجسم إلى: ${config.A_body}`);
    });

    this.controllers.A_canopy = aero.add(config, 'A_canopy', 1, 10).name('مساحة المظلة').onChange(() => {
      console.log(`تم تحديث مساحة المظلة إلى: ${config.A_canopy}`);
    });

    const lift = this.gui.addFolder('الرفع');
    this.controllers.Cl = lift.add(config, 'Cl', 0, 3).name('معامل الرفع').onChange(() => {
      console.log(`تم تحديث معامل الرفع إلى: ${config.Cl}`);
    });

    const chute = this.gui.addFolder('فتح المظلة');
    this.controllers.T_open = chute.add(config, 'T_open', 0.1, 5).name('مدة الفتح').onChange(() => {
      console.log(`تم تحديث مدة الفتح إلى: ${config.T_open}`);
    });

    // إزالة "الاتصال بالأرض" بالكامل
    // لا حاجة له بعد التوقف البسيط عند y=0


    this.gui.open();
  }

  resetSimulation() {
    if (typeof resetSimulation === 'function') {
      resetSimulation();
      console.log('تمت إعادة تعيين المحاكاة');

      for (const key in this.controllers) {
        if (this.controllers[key] && this.controllers[key].updateDisplay) {
          this.controllers[key].updateDisplay();
        }
      }
    } else {
      console.error('دالة إعادة التعيين غير متوفرة');
    }
  }
}