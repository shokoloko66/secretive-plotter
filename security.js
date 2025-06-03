// Função para detectar ferramentas de desenvolvedor
function detectDevTools() {
    // Detecta se as ferramentas de desenvolvedor estão abertas
    let devtools = function() {};
    devtools.toString = function() {
        showWarning();
        return '';
    };

    // Monitora mudanças na janela que podem indicar ferramentas de desenvolvedor
    setInterval(function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if (widthThreshold || heightThreshold) {
            showWarning();
        }
    }, 1000);

    // Monitora teclas de atalho comuns das ferramentas de desenvolvedor
    window.addEventListener('keydown', function(e) {
        if (
            (e.key === 'F12') ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C')
        ) {
            e.preventDefault();
            showWarning();
        }
    });
}

// Função para exibir o aviso
function showWarning() {
    if (!document.getElementById('security-warning')) {
        const warning = document.createElement('div');
        warning.id = 'security-warning';
        warning.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            color: #ff3333;
            padding: 30px;
            border-radius: 20px;
            z-index: 9999;
            text-align: center;
            font-family: 'Segoe UI', Arial, sans-serif;
            box-shadow: 0 0 30px rgba(255, 51, 51, 0.3);
            animation: pulseWarning 2s infinite;
            backdrop-filter: blur(10px);
            border: 2px solid #ff3333;
            max-width: 400px;
            width: 90%;
        `;

        // Adiciona a animação ao documento
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulseWarning {
                0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 30px rgba(255, 51, 51, 0.3); }
                50% { transform: translate(-50%, -50%) scale(1.02); box-shadow: 0 0 40px rgba(255, 51, 51, 0.5); }
                100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 30px rgba(255, 51, 51, 0.3); }
            }
            @keyframes countdown {
                from { transform: scale(1.2); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        let secondsLeft = 7;
        const updateCountdown = () => {
            warning.innerHTML = `
                <div style="font-size: 3em; margin-bottom: 15px">⚠️</div>
                <h3 style="margin: 0 0 15px 0; font-size: 1.6em; font-weight: 700; text-transform: uppercase; letter-spacing: 1px">Alerta de Segurança</h3>
                <p style="margin: 0; font-size: 1.2em; line-height: 1.6; color: #ff6666">Acesso Não Autorizado<br>Esta ação foi bloqueada por motivos de segurança.</p>
                <div style="margin-top: 15px; font-size: 1.4em; color: #ff9999; animation: countdown 0.5s ease-out">
                    Redirecionando em ${secondsLeft} segundos...
                </div>
            `;
        };

        document.body.appendChild(warning);
        updateCountdown();

        const countdownInterval = setInterval(() => {
            secondsLeft--;
            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
                window.location.href = 'https://www.google.com/';
            } else {
                updateCountdown();
            }
        }, 1000);
    }
}

// Inicializa a proteção quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    detectDevTools();
});
