// أدوات مشتركة

// gui/gui-utils.js
export class GUIManager {
    static createTelemetryPanel(containerId = 'telemetry-panel') {
        // إنشاء لوحة عرض البيانات
        let panel = document.getElementById(containerId);

        if (!panel) {
            panel = document.createElement('div');
            panel.id = containerId;
            panel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        z-index: 1000;
        width: 300px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      `;
            document.body.appendChild(panel);
        }

        return panel;
    }

    static createConfigPanel(containerId = 'config-panel') {
        // إنشاء لوحة إعدادات
        let panel = document.getElementById(containerId);

        if (!panel) {
            panel = document.createElement('div');
            panel.id = containerId;
            panel.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        z-index: 1000;
        width: 350px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      `;
            document.body.appendChild(panel);
        }

        return panel;
    }

    static createInputField(container, label, value, min, max, step, onChange) {
        const field = document.createElement('div');
        field.style.margin = '8px 0';

        const labelEl = document.createElement('label');
        labelEl.textContent = label;
        labelEl.style.display = 'block';
        labelEl.style.marginBottom = '4px';

        const input = document.createElement('input');
        input.type = 'range';
        input.min = min;
        input.max = max;
        input.step = step;
        input.value = value;
        input.style.width = '100%';

        const valueDisplay = document.createElement('span');
        valueDisplay.textContent = value;
        valueDisplay.style.float = 'right';

        input.addEventListener('input', () => {
            valueDisplay.textContent = input.value;
            onChange(parseFloat(input.value));
        });

        field.appendChild(labelEl);
        field.appendChild(input);
        field.appendChild(valueDisplay);

        container.appendChild(field);
        return input;
    }
}