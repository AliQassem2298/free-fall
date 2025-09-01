// // تعديل المعايير

// // gui/config-gui.js
// import { config } from '../physics.js';
// import { GUIManager } from './gui-utils.js';

// export class ConfigGUI {
//     constructor() {
//         this.panel = GUIManager.createConfigPanel();
//         this.createContent();
//     }

//     createContent() {
//         this.panel.innerHTML = `
//       <h3 style="margin-top: 0; color: #FF9800;">Physics Configuration</h3>
//       <div id="config-content"></div>
//     `;
//         this.contentDiv = document.getElementById('config-content');
//         this.createFields();
//     }

//     createFields() {
//         const fields = [
//             {
//                 label: 'Mass (kg)',
//                 value: config.mass,
//                 min: 50,
//                 max: 150,
//                 step: 1,
//                 onChange: (val) => { config.mass = val; }
//             },
//             {
//                 label: 'Canopy Drag Coeff',
//                 value: config.Cd_canopy,
//                 min: 0.5,
//                 max: 3.0,
//                 step: 0.1,
//                 onChange: (val) => { config.Cd_canopy = val; }
//             },
//             {
//                 label: 'Body Drag Coeff',
//                 value: config.Cd_body,
//                 min: 0.5,
//                 max: 2.0,
//                 step: 0.1,
//                 onChange: (val) => { config.Cd_body = val; }
//             },
//             {
//                 label: 'Canopy Area (m²)',
//                 value: config.A_canopy,
//                 min: 10,
//                 max: 50,
//                 step: 1,
//                 onChange: (val) => { config.A_canopy = val; }
//             },
//             {
//                 label: 'Gravity (m/s²)',
//                 value: config.g,
//                 min: 5,
//                 max: 12,
//                 step: 0.1,
//                 onChange: (val) => { config.g = val; }
//             },
//             {
//                 label: 'Wind X (m/s)',
//                 value: config.wind.x,
//                 min: -10,
//                 max: 10,
//                 step: 0.5,
//                 onChange: (val) => { config.wind.x = val; }
//             },
//             {
//                 label: 'Wind Z (m/s)',
//                 value: config.wind.z,
//                 min: -10,
//                 max: 10,
//                 step: 0.5,
//                 onChange: (val) => { config.wind.z = val; }
//             },
//             {
//                 label: 'Parachute Open Time (s)',
//                 value: config.T_open,
//                 min: 0.5,
//                 max: 3.0,
//                 step: 0.1,
//                 onChange: (val) => { config.T_open = val; }
//             }
//         ];

//         fields.forEach(field => {
//             GUIManager.createInputField(
//                 this.contentDiv,
//                 field.label,
//                 field.value,
//                 field.min,
//                 field.max,
//                 field.step,
//                 field.onChange
//             );
//         });
//     }
// }
import * as dat from 'lil-gui';
import { config, state, resetSimulation } from '../physics.js';

export class ConfigGUI {
  constructor() {
    // Position on the right side of the screen
    this.gui = new dat.GUI({
      title: 'Config (Inputs)',
      container: document.body,
      autoPlace: false
    });

    // Create a container for the GUI and position it on the right
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px'; // Position on the right side
    container.style.zIndex = '1000';
    container.appendChild(this.gui.domElement);
    document.body.appendChild(container);

    this.controllers = {};

    // Add folders for organization
    const env = this.gui.addFolder('Environment');
    this.controllers.rho = env.add(config, 'rho', 0.5, 2).name('Air Density').onChange(() => {
      console.log(`Updated Air Density to: ${config.rho}`);
    });

    this.controllers.g = env.add(config, 'g', 0, 20).name('Gravity').onChange(() => {
      console.log(`Updated Gravity to: ${config.g}`);
    });

    const mass = this.gui.addFolder('Mass');
    this.controllers.mass = mass.add(config, 'mass', 1, 200).name('Body Mass').onChange(() => {
      console.log(`Updated Body Mass to: ${config.mass}`);
    });

    const aero = this.gui.addFolder('Aerodynamics');
    this.controllers.Cd_body = aero.add(config, 'Cd_body', 0.5, 2).name('Cd Body').onChange(() => {
      console.log(`Updated Cd Body to: ${config.Cd_body}`);
    });

    this.controllers.Cd_canopy = aero.add(config, 'Cd_canopy', 0.5, 2).name('Cd Canopy').onChange(() => {
      console.log(`Updated Cd Canopy to: ${config.Cd_canopy}`);
    });

    this.controllers.A_body = aero.add(config, 'A_body', 0.1, 2).name('Area Body').onChange(() => {
      console.log(`Updated Area Body to: ${config.A_body}`);
    });

    this.controllers.A_canopy = aero.add(config, 'A_canopy', 5, 50).name('Area Canopy').onChange(() => {
      console.log(`Updated Area Canopy to: ${config.A_canopy}`);
    });

    const lift = this.gui.addFolder('Lift');
    this.controllers.Cl = lift.add(config, 'Cl', 0, 3).name('Lift Coefficient').onChange(() => {
      console.log(`Updated Lift Coefficient to: ${config.Cl}`);
    });

    const chute = this.gui.addFolder('Parachute Opening');
    this.controllers.T_open = chute.add(config, 'T_open', 0.1, 5).name('Open Time').onChange(() => {
      console.log(`Updated Open Time to: ${config.T_open}`);
    });

    const ground = this.gui.addFolder('Ground Contact');
    this.controllers.k = ground.add(config, 'k', 1000, 100000).name('Spring Constant').onChange(() => {
      console.log(`Updated Spring Constant to: ${config.k}`);
    });

    this.controllers.c = ground.add(config, 'c', 100, 20000).name('Damper Constant').onChange(() => {
      console.log(`Updated Damper Constant to: ${config.c}`);
    });

    this.controllers.stickEps = ground.add(config, 'stickEps', 0, 1).name('Stop Speed').onChange(() => {
      console.log(`Updated Stop Speed to: ${config.stickEps}`);
    });

    // Add reset button
    this.gui.add({ reset: () => this.resetSimulation() }, 'reset').name('Reset Simulation');

    this.gui.open();
  }

  resetSimulation() {
    if (typeof resetSimulation === 'function') {
      resetSimulation();
      console.log('Simulation reset');

      // Update all controllers to reflect new values
      for (const key in this.controllers) {
        if (this.controllers[key] && this.controllers[key].updateDisplay) {
          this.controllers[key].updateDisplay();
        }
      }
    } else {
      console.error('resetSimulation function not available');
    }
  }
}
