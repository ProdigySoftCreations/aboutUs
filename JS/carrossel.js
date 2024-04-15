document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-carrosel");
    const background = document.querySelector(".background");
    const fotos = document.querySelectorAll(".fotos");
    let currentIndex = 0;
    let interval;
    let isDragging = false;
    let initialPosition = 0;

    function changePhoto(index) {
        const offset = index * -100;
        background.style.transition = "transform 0.3s ease";
        background.style.transform = `translateX(${offset}%)`;
        currentIndex = index;
        resetInterval();

        // Aumentando o tamanho do botão relacionado ao índice
        buttons.forEach((button, i) => {
            if (i === index) {
                button.style.padding = "5px 30px"; 
            } else {
                button.style.padding = ""; // Reverte para o tamanho padrão
            }
        });
    }

    function handleKeyPress(event) {
        if (event.key === "ArrowLeft") {
            const newIndex = (currentIndex - 1 + fotos.length) % fotos.length;
            changePhoto(newIndex);
        } else if (event.key === "ArrowRight") {
            const newIndex = (currentIndex + 1) % fotos.length;
            changePhoto(newIndex);
        }
    }

    document.addEventListener("keydown", handleKeyPress);

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            changePhoto(index);
        });
    });

    function startCarousel() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % fotos.length;
            changePhoto(currentIndex);
        }, 15000); //Atualizado de 5 para 15 segundos
    }

    function resetInterval() {
        clearInterval(interval);
        setTimeout(() => {
            background.style.transition = "";
        }, 300);
        startCarousel();
    }

    startCarousel();

    background.addEventListener("mousedown", handleDragStart);
    background.addEventListener("touchstart", handleDragStart);

    function handleDragStart(e) {
        isDragging = true;
        initialPosition = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
        background.style.transition = "";
        e.preventDefault();
    }

    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);

    function handleDragEnd() {
        if (isDragging) {
            isDragging = false;
            resetInterval();
        }
    }

    background.addEventListener("mousemove", handleDragMove);
    background.addEventListener("touchmove", handleDragMove);

    function handleDragMove(e) {
        if (isDragging) {
            const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
            const movement = clientX - initialPosition;
            const newIndex = currentIndex - Math.sign(movement);
            const newIndexClamped = Math.min(Math.max(newIndex, 0), fotos.length - 1);
            if (newIndexClamped !== currentIndex) {
                changePhoto(newIndexClamped);
            }
            isDragging = false;
        }
    }

    background.addEventListener("mouseleave", () => {
        if (isDragging) {
            isDragging = false;
            resetInterval();
        }
    });

    // Chama a função changePhoto no primeiro acesso ao site
    changePhoto(currentIndex);
});
