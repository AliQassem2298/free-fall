// // // export class TelemetryOverlay {
// // //     constructor(state, telemetry, config) {
// // //         this.state = state;
// // //         this.telemetry = telemetry;
// // //         this.config = config;
// // //         this.init();
// // //     }

// // //     init() {
// // //         const overlay = document.createElement('div');
// // //         overlay.id = 'telemetry-overlay';
// // //         document.body.appendChild(overlay);

// // //         const style = document.createElement('style');
// // //         style.textContent = `
// // //             #telemetry-overlay {
// // //                 position: absolute;
// // //                 top: 15px;
// // //                 left: 15px;
// // //                 background: rgba(0, 0, 0, 0.85);
// // //                 color: white;
// // //                 font-family: 'Courier New', monospace;
// // //                 font-size: 13px;
// // //                 padding: 12px 16px;
// // //                 border-radius: 8px;
// // //                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
// // //                 z-index: 1000;
// // //                 max-width: 320px;
// // //                 line-height: 1.6;
// // //             }
// // //             #telemetry-overlay h3 {
// // //                 margin: 0 0 10px;
// // //                 color: #4CAF50;
// // //                 font-size: 15px;
// // //                 border-bottom: 1px solid #333;
// // //                 padding-bottom: 6px;
// // //             }
// // //             #telemetry-overlay p {
// // //                 margin: 4px 0;
// // //                 display: flex;
// // //                 justify-content: space-between;
// // //             }
// // //             strong {
// // //                 color: #BBDEFB;
// // //             }
// // //             .value {
// // //                 color: #E8F5E8;
// // //                 font-weight: bold;
// // //                 margin-left: 8px;
// // //             }
// // //         `;
// // //         document.head.appendChild(style);

// // //         overlay.innerHTML = `
// // //             <h3>Paratrooper Telemetry</h3>
// // //             <div id="telemetry-data">
// // //                 <p><strong>Time:</strong> <span class="value" id="time-value">0.00</span> s</p>
// // //                 <p><strong>Altitude:</strong> <span class="value" id="altitude-value">1000.0</span> m</p>
// // //                 <p><strong>Speed:</strong> <span class="value" id="speed-value">0.00</span> m/s</p>
// // //                 <p><strong>Vertical Speed:</strong> <span class="value" id="vertical-speed-value">0.00</span> m/s</p>
// // //                 <p><strong>Horizontal Speed:</strong> <span class="value" id="horizontal-speed-value">0.00</span> m/s</p>
// // //                 <p><strong>Kinetic Energy:</strong> <span class="value" id="kinetic-energy-value">0.0</span> kJ</p>
// // //                 <p><strong>Potential Energy:</strong> <span class="value" id="potential-energy-value">0.0</span> kJ</p>
// // //                 <p><strong>Drag Force:</strong> <span class="value" id="drag-force-value">0.0</span> N</p>
// // //                 <p><strong>Terminal Velocity:</strong> <span class="value" id="terminal-velocity-value">0.00</span> m/s</p>
// // //                 <p><strong>Phase:</strong> <span class="value" id="phase-value">سقوط حر</span></p>
// // //                 <p><strong>Open Progress:</strong> <span class="value" id="open-progress-value">0%</span></p>
// // //             </div>
// // //         `;
// // //     }

// // //     update() {
// // //         const t = this.telemetry;
// // //         const s = this.state;

// // //         document.getElementById('time-value').textContent = t.time.toFixed(2);
// // //         document.getElementById('altitude-value').textContent = t.altitude.toFixed(1);
// // //         document.getElementById('speed-value').textContent = t.speed.toFixed(2);
// // //         document.getElementById('vertical-speed-value').textContent = t.verticalSpeed.toFixed(2);
// // //         document.getElementById('horizontal-speed-value').textContent = t.horizontalSpeed.toFixed(2);
// // //         document.getElementById('kinetic-energy-value').textContent = (t.kineticEnergy / 1000).toFixed(1);
// // //         document.getElementById('potential-energy-value').textContent = (t.potentialEnergy / 1000).toFixed(1);
// // //         document.getElementById('drag-force-value').textContent = t.dragForce.toFixed(1);
// // //         document.getElementById('terminal-velocity-value').textContent = t.terminalVelocity.toFixed(2);
// // //         document.getElementById('phase-value').textContent = s.phase;
// // //         document.getElementById('open-progress-value').textContent = (s.openProgress * 100).toFixed(0) + '%';
// // //     }
// // // }





















// // // //////////////////////////////////////////////////////////////////////


// // // src/gui/TelemetryOverlay.js
// // export class TelemetryOverlay {
// //     constructor(state, telemetry, config) {
// //         this.state = state;
// //         this.telemetry = telemetry;
// //         this.config = config;
// //         this.lastValues = {}; // For detecting changes
// //         this.init();
// //     }

// //     init() {
// //         const overlay = document.createElement('div');
// //         overlay.id = 'telemetry-overlay';
// //         document.body.appendChild(overlay);

// //         const style = document.createElement('style');
// //         style.textContent = `
// //       #telemetry-overlay {
// //         position: absolute;
// //         top: 20px;
// //         left: 20px;
// //         background: linear-gradient(145deg, #0f1a20, #0a1218);
// //         color: #e0f7fa;
// //         font-family: 'Segoe UI', Arial, sans-serif;
// //         font-size: 13px;
// //         font-weight: 500;
// //         padding: 16px 20px;
// //         border-radius: 12px;
// //         box-shadow: 
// //           0 8px 32px rgba(0, 0, 0, 0.4),
// //           0 0 0 1px rgba(100, 200, 255, 0.1);
// //         z-index: 1000;
// //         max-width: 340px;
// //         backdrop-filter: blur(4px);
// //         border: 1px solid rgba(100, 200, 255, 0.1);
// //         transition: transform 0.2s ease;
// //       }

// //       #telemetry-overlay h3 {
// //         margin: 0 0 14px;
// //         font-size: 16px;
// //         font-weight: 600;
// //         color: #4FC3F7;
// //         letter-spacing: 0.3px;
// //         display: flex;
// //         align-items: center;
// //       }

// //       #telemetry-overlay h3::before {
// //         content: "📡";
// //         margin-right: 8px;
// //         font-size: 18px;
// //       }

// //       .telemetry-group {
// //         margin-bottom: 12px;
// //         padding-bottom: 10px;
// //         border-bottom: 1px solid rgba(255, 255, 255, 0.08);
// //       }

// //       .telemetry-group:last-child {
// //         border-bottom: none;
// //         margin-bottom: 0;
// //         padding-bottom: 0;
// //       }

// //       .telemetry-row {
// //         display: flex;
// //         justify-content: space-between;
// //         margin: 6px 0;
// //         transition: opacity 0.3s ease;
// //       }

// //       .telemetry-row.changed {
// //         opacity: 1 !important;
// //         color: #A8E6CF !important;
// //         transform: translateX(4px);
// //       }

// //       .label {
// //         color: #81D4FA;
// //         font-size: 12px;
// //       }

// //       .value {
// //         color: #FFFFFF;
// //         font-weight: 600;
// //         font-size: 12.5px;
// //         text-align: right;
// //         min-width: 70px;
// //         transition: color 0.3s ease, transform 0.2s ease;
// //       }

// //       .unit {
// //         color: #64B5F6;
// //         font-size: 11px;
// //         margin-left: 2px;
// //       }

// //       .phase-value {
// //         font-weight: 700;
// //         transition: color 0.4s ease;
// //       }

// //       .progress-bar-container {
// //         width: 100%;
// //         height: 4px;
// //         background: rgba(255, 255, 255, 0.1);
// //         border-radius: 2px;
// //         margin: 6px 0 2px;
// //         overflow: hidden;
// //       }

// //       .progress-bar {
// //         height: 100%;
// //         width: 0%;
// //         background: #4FC3F7;
// //         border-radius: 2px;
// //         transition: width 0.3s ease;
// //       }

// //       @media (max-height: 720px) {
// //         #telemetry-overlay {
// //           transform: scale(0.9);
// //           transform-origin: top left;
// //         }
// //       }
// //     `;
// //         document.head.appendChild(style);

// //         overlay.innerHTML = `
// //       <h3>Paratrooper Telemetry</h3>

// //       <div class="telemetry-group">
// //         <div class="telemetry-row">
// //           <span class="label">Time</span>
// //           <span class="value" id="time-value">0.00</span><span class="unit">s</span>
// //         </div>
// //         <div class="telemetry-row">
// //           <span class="label">Altitude</span>
// //           <span class="value" id="altitude-value">1000.0</span><span class="unit">m</span>
// //         </div>
// //         <div class="telemetry-row">
// //           <span class="label">Speed</span>
// //           <span class="value" id="speed-value">0.00</span><span class="unit">m/s</span>
// //         </div>
// //       </div>

// //       <div class="telemetry-group">
// //         <div class="telemetry-row">
// //           <span class="label">Vertical Speed</span>
// //           <span class="value" id="vertical-speed-value">0.00</span><span class="unit">m/s</span>
// //         </div>
// //         <div class="telemetry-row">
// //           <span class="label">Horizontal Speed</span>
// //           <span class="value" id="horizontal-speed-value">0.00</span><span class="unit">m/s</span>
// //         </div>
// //       </div>

// //       <div class="telemetry-group">
// //         <div class="telemetry-row">
// //           <span class="label">Kinetic Energy</span>
// //           <span class="value" id="kinetic-energy-value">0.0</span><span class="unit">kJ</span>
// //         </div>
// //         <div class="telemetry-row">
// //           <span class="label">Potential Energy</span>
// //           <span class="value" id="potential-energy-value">0.0</span><span class="unit">kJ</span>
// //         </div>
// //       </div>

// //       <div class="telemetry-group">
// //         <div class="telemetry-row">
// //           <span class="label">Drag Force</span>
// //           <span class="value" id="drag-force-value">0.0</span><span class="unit">N</span>
// //         </div>
// //         <div class="telemetry-row">
// //           <span class="label">Terminal Velocity</span>
// //           <span class="value" id="terminal-velocity-value">0.00</span><span class="unit">m/s</span>
// //         </div>
// //       </div>

// //       <div class="telemetry-group">
// //         <div class="telemetry-row">
// //           <span class="label">Phase</span>
// //           <span class="value phase-value" id="phase-value">سقوط حر</span>
// //         </div>
// //         <div class="progress-bar-container">
// //           <div class="progress-bar" id="open-progress-bar"></div>
// //         </div>
// //       </div>
// //     `;

// //         // Initialize last values
// //         this.lastValues = { ...this.telemetry, openProgress: 0 };
// //     }

// //     update() {
// //         const t = this.telemetry;
// //         const s = this.state;

// //         this.updateField('time-value', t.time.toFixed(2));
// //         this.updateField('altitude-value', t.altitude.toFixed(1));
// //         this.updateField('speed-value', t.speed.toFixed(2));
// //         this.updateField('vertical-speed-value', t.verticalSpeed.toFixed(2));
// //         this.updateField('horizontal-speed-value', t.horizontalSpeed.toFixed(2));
// //         this.updateField('kinetic-energy-value', (t.kineticEnergy / 1000).toFixed(1));
// //         this.updateField('potential-energy-value', (t.potentialEnergy / 1000).toFixed(1));
// //         this.updateField('drag-force-value', t.dragForce.toFixed(1));
// //         this.updateField('terminal-velocity-value', t.terminalVelocity.toFixed(2));

// //         // Update phase with color
// //         const phaseEl = document.getElementById('phase-value');
// //         phaseEl.textContent = s.phase;

// //         // Phase color logic
// //         phaseEl.style.color =
// //             s.phase === 'سقوط حر' ? '#81D4FA' :
// //                 s.phase === 'فتح المظلة' ? '#FFB74D' :
// //                     s.phase === 'تحت المظلة' ? '#66BB6A' :
// //                         s.phase === 'ملامسة الأرض' ? '#E57373' : '#FFFFFF';

// //         // Progress bar
// //         const progressBar = document.getElementById('open-progress-bar');
// //         const progressPercent = s.openProgress * 100;
// //         progressBar.style.width = `${progressPercent}%`;
// //     }

// //     updateField(elementId, newValue) {
// //         const element = document.getElementById(elementId);
// //         const oldValue = this.lastValues[elementId];

// //         if (oldValue !== newValue) {
// //             element.textContent = newValue;
// //             element.style.transform = 'scale(1.1)';
// //             element.classList.add('changed');

// //             setTimeout(() => {
// //                 element.style.transform = '';
// //                 element.classList.remove('changed');
// //             }, 300);
// //         }

// //         this.lastValues[elementId] = newValue;
// //     }
// // }


// // src/gui/TelemetryOverlay.js
// export class TelemetryOverlay {
//     constructor(state, telemetry, config) {
//         this.state = state;
//         this.telemetry = telemetry;
//         this.config = config;
//         this.init();
//     }

//     init() {
//         const overlay = document.createElement('div');
//         overlay.id = 'telemetry-overlay';
//         document.body.appendChild(overlay);

//         const style = document.createElement('style');
//         style.textContent = `
//       #telemetry-overlay {
//         position: absolute;
//         top: 20px;
//         left: 20px;
//         background: linear-gradient(145deg, #0a0a0a, #121212);
//         color: #e0f7fa;
//         font-family: 'Courier New', monospace;
//         font-size: 13px;
//         padding: 16px 20px;
//         border-radius: 8px;
//         box-shadow: 
//           0 8px 32px rgba(0, 0, 0, 0.4),
//           0 0 0 1px rgba(100, 200, 255, 0.1);
//         z-index: 1000;
//         max-width: 340px;
//         backdrop-filter: blur(4px);
//         border: 1px solid rgba(100, 200, 255, 0.1);
//         transition: transform 0.2s ease;
//       }

//       #telemetry-overlay h3 {
//         margin: 0 0 12px;
//         font-size: 16px;
//         font-weight: 600;
//         color: #4CAF50;
//         letter-spacing: 0.3px;
//         border-bottom: 1px solid #4CAF50;
//         padding-bottom: 6px;
//       }

//       .section-title {
//         color: #FFB300;
//         font-weight: 600;
//         margin: 12px 0 6px;
//         font-size: 12px;
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//       }

//       .data-row {
//         display: flex;
//         justify-content: space-between;
//         margin: 6px 0;
//         line-height: 1.4;
//       }

//       .label {
//         color: #81D4FA;
//         font-size: 12px;
//         min-width: 100px;
//       }

//       .value {
//         color: #FFFFFF;
//         font-weight: 500;
//         font-size: 12.5px;
//         text-align: right;
//         min-width: 80px;
//       }

//       .unit {
//         color: #64B5F6;
//         font-size: 11px;
//         margin-left: 2px;
//       }

//       .phase-value {
//         color: #FFF;
//         font-weight: 500;
//       }

//       @media (max-height: 720px) {
//         #telemetry-overlay {
//           transform: scale(0.9);
//           transform-origin: top left;
//         }
//       }
//     `;
//         document.head.appendChild(style);

//         overlay.innerHTML = `
//       <h3>Telemetry Data</h3>

//       <!-- Time & Phase -->
//       <div class="section-title">Time & Phase</div>
//       <div class="data-row">
//         <span class="label">Time</span>
//         <span class="value" id="time-value">0.00</span><span class="unit">s</span>
//       </div>
//       <div class="data-row">
//         <span class="label">Phase</span>
//         <span class="value phase-value" id="phase-value">سقوط حر</span>
//       </div>
//       <div class="data-row">
//         <span class="label">Altitude</span>
//         <span class="value" id="altitude-value">0.0</span><span class="unit">m</span>
//       </div>

//       <!-- Velocity -->
//       <div class="section-title">Velocity</div>
//       <div class="data-row">
//         <span class="label">Speed</span>
//         <span class="value" id="speed-value">0.00</span><span class="unit">m/s</span>
//       </div>
//       <div class="data-row">
//         <span class="label">Vertical</span>
//         <span class="value" id="vertical-speed-value">0.00</span><span class="unit">m/s</span>
//       </div>
//       <div class="data-row">
//         <span class="label">Horizontal</span>
//         <span class="value" id="horizontal-speed-value">0.00</span><span class="unit">m/s</span>
//       </div>

//       <!-- Energy -->
//       <div class="section-title">Energy (kJ)</div>
//       <div class="data-row">
//         <span class="label">Kinetic</span>
//         <span class="value" id="kinetic-energy-value">0.0</span>
//       </div>
//       <div class="data-row">
//         <span class="label">Potential</span>
//         <span class="value" id="potential-energy-value">0.0</span>
//       </div>

//       <!-- Forces -->
//       <div class="section-title">Forces</div>
//       <div class="data-row">
//         <span class="label">Drag</span>
//         <span class="value" id="drag-force-value">0</span><span class="unit">N</span>
//       </div>
//       <div class="data-row">
//         <span class="label">Weight</span>
//         <span class="value" id="weight-value">0</span><span class="unit">N</span>
//       </div>

//       <!-- Parachute -->
//       <div class="section-title">Parachute</div>
//       <div class="data-row">
//         <span class="label">Terminal Vel</span>
//         <span class="value" id="terminal-velocity-value">0.00</span><span class="unit">m/s</span>
//       </div>
//       <div class="data-row">
//         <span class="label">Open Progress</span>
//         <span class="value" id="open-progress-value">0.0%</span>
//       </div>
//     `;
//     }

//     update() {
//         const t = this.telemetry;
//         const s = this.state;

//         // Time
//         document.getElementById('time-value').textContent = t.time.toFixed(2);

//         // Phase
//         const phaseEl = document.getElementById('phase-value');
//         phaseEl.textContent = s.phase;

//         // Altitude
//         document.getElementById('altitude-value').textContent = t.altitude.toFixed(1);

//         // Speed
//         document.getElementById('speed-value').textContent = t.speed.toFixed(2);

//         // Vertical Speed
//         document.getElementById('vertical-speed-value').textContent = t.verticalSpeed.toFixed(2);

//         // Horizontal Speed
//         document.getElementById('horizontal-speed-value').textContent = t.horizontalSpeed.toFixed(2);

//         // Kinetic Energy (in kJ)
//         document.getElementById('kinetic-energy-value').textContent = (t.kineticEnergy / 1000).toFixed(1);

//         // Potential Energy (in kJ)
//         document.getElementById('potential-energy-value').textContent = (t.potentialEnergy / 1000).toFixed(1);

//         // Drag Force
//         document.getElementById('drag-force-value').textContent = Math.round(t.dragForce);

//         // Weight
//         document.getElementById('weight-value').textContent = Math.round(t.weight);

//         // Terminal Velocity
//         document.getElementById('terminal-velocity-value').textContent = t.terminalVelocity.toFixed(2);

//         // Open Progress
//         document.getElementById('open-progress-value').textContent = (s.openProgress * 100).toFixed(1) + '%';

//         // Phase color logic (optional)
//         phaseEl.style.color =
//             s.phase === 'سقوط حر' ? '#FFB300' :
//                 s.phase === 'فتح المظلة' ? '#FF9800' :
//                     s.phase === 'تحت المظلة' ? '#4CAF50' :
//                         s.phase === 'ملامسة الأرض' ? '#F44336' : '#FFFFFF';
//     }
// }


// src/gui/TelemetryOverlay.js

export class TelemetryOverlay {
  constructor(state, telemetry, config) {
    this.state = state;
    this.telemetry = telemetry;
    this.config = config;
    this.init();
  }

  init() {
    const overlay = document.createElement('div');
    overlay.id = 'telemetry-overlay';
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
      #telemetry-overlay {
        position: absolute;
        top: 20px;
        left: 20px;
        background: linear-gradient(145deg, #0a0a0a, #121212);
        color: #e0f7fa;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 
          0 8px 32px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(100, 200, 255, 0.1);
        z-index: 1000;
        max-width: 340px;
        backdrop-filter: blur(4px);
        border: 1px solid rgba(100, 200, 255, 0.1);
        transition: transform 0.2s ease;
      }

      #telemetry-overlay h3 {
        margin: 0 0 12px;
        font-size: 16px;
        font-weight: 600;
        color: #4CAF50;
        letter-spacing: 0.3px;
        border-bottom: 1px solid #4CAF50;
        padding-bottom: 6px;
      }

      .section-title {
        color: #FFB300;
        font-weight: 600;
        margin: 12px 0 6px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .data-row {
        display: flex;
        justify-content: space-between;
        margin: 6px 0;
        line-height: 1.4;
      }

      .label {
        color: #81D4FA;
        font-size: 12px;
        min-width: 100px;
      }

      .value {
        color: #FFFFFF;
        font-weight: 500;
        font-size: 12.5px;
        text-align: right;
        min-width: 80px;
      }

      .unit {
        color: #64B5F6;
        font-size: 11px;
        margin-left: 2px;
      }

      .phase-value {
        color: #FFF;
        font-weight: 500;
      }

      @media (max-height: 720px) {
        #telemetry-overlay {
          transform: scale(0.9);
          transform-origin: top left;
        }
      }
    `;
    document.head.appendChild(style);

    overlay.innerHTML = `
      <h3>بيانات القياس</h3>

      <!-- الوقت والمرحلة -->
      <div class="section-title">الوقت والمرحلة</div>
      <div class="data-row">
        <span class="label">الوقت</span>
        <span class="value" id="time-value">0.00</span><span class="unit">ث</span>
      </div>
      <div class="data-row">
        <span class="label">المرحلة</span>
        <span class="value phase-value" id="phase-value">سقوط حر</span>
      </div>
      <div class="data-row">
        <span class="label">الارتفاع</span>
        <span class="value" id="altitude-value">0.0</span><span class="unit">م</span>
      </div>

      <!-- السرعة -->
      <div class="section-title">السرعة</div>
      <div class="data-row">
        <span class="label">السرعة الكلية</span>
        <span class="value" id="speed-value">0.00</span><span class="unit">م/ث</span>
      </div>
      <div class="data-row">
        <span class="label">العمودية</span>
        <span class="value" id="vertical-speed-value">0.00</span><span class="unit">م/ث</span>
      </div>
      <div class="data-row">
        <span class="label">الأفقية</span>
        <span class="value" id="horizontal-speed-value">0.00</span><span class="unit">م/ث</span>
      </div>

      <!-- الطاقة -->
      <div class="section-title">الطاقة (كيلو جول)</div>
      <div class="data-row">
        <span class="label">الحركية</span>
        <span class="value" id="kinetic-energy-value">0.0</span>
      </div>
      <div class="data-row">
        <span class="label">الكامنة</span>
        <span class="value" id="potential-energy-value">0.0</span>
      </div>

      <!-- القوى -->
      <div class="section-title">القوى</div>
      <div class="data-row">
        <span class="label">مقاومة الهواء</span>
        <span class="value" id="drag-force-value">0</span><span class="unit">ن</span>
      </div>
      <div class="data-row">
        <span class="label">الوزن</span>
        <span class="value" id="weight-value">0</span><span class="unit">ن</span>
      </div>

      <!-- المظلة -->
      <div class="section-title">المظلة</div>
      <div class="data-row">
        <span class="label">السرعة اللحظية</span>
        <span class="value" id="terminal-velocity-value">0.00</span><span class="unit">م/ث</span>
      </div>
      <div class="data-row">
        <span class="label">تقدم الفتح</span>
        <span class="value" id="open-progress-value">0.0%</span>
      </div>
    `;
  }

  update() {
    const t = this.telemetry;
    const s = this.state;

    document.getElementById('time-value').textContent = t.time.toFixed(2);
    document.getElementById('altitude-value').textContent = t.altitude.toFixed(1);
    document.getElementById('speed-value').textContent = t.speed.toFixed(2);
    document.getElementById('vertical-speed-value').textContent = t.verticalSpeed.toFixed(2);
    document.getElementById('horizontal-speed-value').textContent = t.horizontalSpeed.toFixed(2);
    document.getElementById('kinetic-energy-value').textContent = (t.kineticEnergy / 1000).toFixed(1);
    document.getElementById('potential-energy-value').textContent = (t.potentialEnergy / 1000).toFixed(1);
    document.getElementById('drag-force-value').textContent = Math.round(t.dragForce);
    document.getElementById('weight-value').textContent = Math.round(t.weight);
    document.getElementById('terminal-velocity-value').textContent = t.terminalVelocity.toFixed(2);
    document.getElementById('open-progress-value').textContent = (s.openProgress * 100).toFixed(1) + '%';

    const phaseEl = document.getElementById('phase-value');
    phaseEl.textContent = s.phase;

    // تلوين حسب المرحلة
    phaseEl.style.color =
      s.phase === 'سقوط حر' ? '#FFB300' :
        s.phase === 'فتح المظلة' ? '#FF9800' :
          s.phase === 'تحت المظلة' ? '#4CAF50' :
            s.phase === 'ملامسة الأرض' ? '#F44336' : '#FFFFFF';
  }
}