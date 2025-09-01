// gui/telemetry-gui.js
import { telemetry, state } from '../physics.js';

export class TelemetryGUI {
    constructor() {
        this.initOverlay();
        this.startUpdating();
        
    }

    initOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'telemetry-overlay';
        document.body.appendChild(overlay);

        const style = document.createElement('style');
        style.innerHTML = `
      #telemetry-overlay {
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.85);
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
        color: white;
        font-family: 'Courier New', monospace;
        z-index: 1000;
        width: 300px;
        min-width: 280px;
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      #telemetry-overlay h3 {
        margin: 0 0 12px;
        padding: 0;
        color: #4CAF50;
        font-size: 1.2em;
        font-weight: bold;
        border-bottom: 1px solid #4CAF50;
        padding-bottom: 6px;
      }
      #telemetry-overlay .telemetry-row {
        display: flex;
        justify-content: space-between;
        margin: 6px 0;
        font-size: 0.95em;
        line-height: 1.4;
      }
      #telemetry-overlay .telemetry-row .label {
        color: #ccc;
        min-width: 140px;
      }
      #telemetry-overlay .telemetry-row .value {
        color: #BBDEFB;
        text-align: right;
        font-weight: bold;
        min-width: 90px;
      }
      #telemetry-overlay .section {
        margin: 10px 0 0;
      }
      #telemetry-overlay .section-title {
        color: #FFB74D;
        font-weight: bold;
        margin: 8px 0 4px;
        font-size: 0.9em;
      }
    `;
        document.head.appendChild(style);

        overlay.innerHTML = `
      <h3>Telemetry Data</h3>

      <div class="section">
        <div class="section-title">Time & Phase</div>
        <div class="telemetry-row"><span class="label">Time</span><span class="value" id="time-value">0.00</span><span class="unit"> s</span></div>
        <div class="telemetry-row"><span class="label">Phase</span><span class="value" id="phase-value">-</span></div>
        <div class="telemetry-row"><span class="label">Altitude</span><span class="value" id="altitude-value">0.0</span><span class="unit"> m</span></div>
      </div>

      <div class="section">
        <div class="section-title">Velocity</div>
        <div class="telemetry-row"><span class="label">Speed</span><span class="value" id="speed-value">0.00</span><span class="unit"> m/s</span></div>
        <div class="telemetry-row"><span class="label">Vertical</span><span class="value" id="vertical-speed-value">0.00</span><span class="unit"> m/s</span></div>
        <div class="telemetry-row"><span class="label">Horizontal</span><span class="value" id="horizontal-speed-value">0.00</span><span class="unit"> m/s</span></div>
      </div>

      <div class="section">
        <div class="section-title">Energy (kJ)</div>
        <div class="telemetry-row"><span class="label">Kinetic</span><span class="value" id="kinetic-energy-value">0.0</span></div>
        <div class="telemetry-row"><span class="label">Potential</span><span class="value" id="potential-energy-value">0.0</span></div>
      </div>

      <div class="section">
        <div class="section-title">Forces</div>
        <div class="telemetry-row"><span class="label">Drag</span><span class="value" id="drag-force-value">0</span><span class="unit"> N</span></div>
        <div class="telemetry-row"><span class="label">Weight</span><span class="value" id="weight-value">0</span><span class="unit"> N</span></div>
      </div>

      <div class="section">
        <div class="section-title">Parachute</div>
        <div class="telemetry-row"><span class="label">Terminal Vel</span><span class="value" id="terminal-velocity-value">0.00</span><span class="unit"> m/s</span></div>
        <div class="telemetry-row"><span class="label">Open Progress</span><span class="value" id="open-progress-value">0.0%</span></div>
      </div>
    `;
    }

    updateDisplay() {
        // Update values from telemetry and state
        const update = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        update('time-value', telemetry.time.toFixed(2));
        update('altitude-value', telemetry.altitude.toFixed(1));
        update('speed-value', telemetry.speed.toFixed(2));
        update('vertical-speed-value', telemetry.verticalSpeed.toFixed(2));
        update('horizontal-speed-value', telemetry.horizontalSpeed.toFixed(2));
        update('kinetic-energy-value', (telemetry.kineticEnergy / 1000).toFixed(1));
        update('potential-energy-value', (telemetry.potentialEnergy / 1000).toFixed(1));
        update('drag-force-value', Math.round(telemetry.dragForce));
        update('weight-value', Math.round(telemetry.weight));
        update('terminal-velocity-value', telemetry.terminalVelocity.toFixed(2));
        update('open-progress-value', (state.openProgress * 100).toFixed(1) + '%');
        update('phase-value', state.phase);
    }

    startUpdating() {
        const loop = () => {
            this.updateDisplay();
            requestAnimationFrame(loop);
        };
        loop();
    }
}