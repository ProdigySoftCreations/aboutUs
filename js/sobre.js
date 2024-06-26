document.addEventListener('DOMContentLoaded', function() {
    const quadrados = document.querySelectorAll('.quadrado');
    const paragrafos = document.querySelectorAll('.paragrafos');

    // Adiciona evento de clique para cada quadrado
    quadrados.forEach((quadrado) => {
        quadrado.addEventListener('click', function() {
            const target = this.getAttribute('data-target'); // Obtém o valor do atributo data-target

            // Remove a classe 'ativado' de todos os quadrados
            quadrados.forEach((item) => {
                item.classList.remove('ativado');
            });

            // Adiciona a classe 'ativado' ao quadrado clicado
            this.classList.add('ativado');

            // Oculta todos os parágrafos
            paragrafos.forEach((paragrafo) => {
                paragrafo.classList.remove('ativo');
            });

            // Mostra o parágrafo correspondente ao quadrado clicado
            const paragrafoCorrespondente = document.querySelector(`.paragrafos[data-atribute="${target}"]`);
            if (paragrafoCorrespondente) {
                paragrafoCorrespondente.classList.add('ativo');
            }
        });
    });
});
