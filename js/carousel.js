// js/carousel.js

// Classe que gerencia o carrossel. Renomeada para evitar conflitos de nome.
class CarouselManager {
    static _sequence = 0;     // Controla o slide atual (índice)
    static _size = 0;         // Quantidade total de slides
    static _interval = null;  // Guarda o ID do setInterval para poder limpá-lo

    // Elementos DOM
    static _slideContainer = null;
    static _dotsContainer = null;
    static _carouselData = []; // Array que armazena os dados de cada slide

    // Método para iniciar o carrossel
    static Start(dataArr) {
        if (!dataArr || dataArr.length === 0) {
            console.error("O método Start precisa de um array com dados dos slides.");
            return;
        }

        CarouselManager._carouselData = dataArr; // Armazena os dados
        CarouselManager._size = dataArr.length;
        CarouselManager._sequence = 0; // Começa sempre do primeiro slide

        CarouselManager._slideContainer = document.querySelector('.carousel-slide');
        CarouselManager._dotsContainer = document.querySelector('.carousel-dots');

        if (!CarouselManager._slideContainer) {
            console.error("Elemento .carousel-slide não encontrado no HTML.");
            return;
        }
        if (!CarouselManager._dotsContainer) {
            console.error("Elemento .carousel-dots não encontrado no HTML.");
            return;
        }

        // Limpa qualquer conteúdo existente antes de popular
        CarouselManager._slideContainer.innerHTML = '';
        CarouselManager._dotsContainer.innerHTML = '';

        CarouselManager._populateSlides(); // Cria os itens do carrossel
        CarouselManager._createDots();    // Cria os indicadores de slide

        // Limpa qualquer intervalo anterior antes de iniciar um novo
        if (CarouselManager._interval) {
            clearInterval(CarouselManager._interval);
        }

        // Exibe o primeiro slide e ajusta os indicadores
        CarouselManager._updateSlidePosition();
        CarouselManager._updateDots();

        // Inicia o carrossel automático
        CarouselManager._interval = setInterval(() => CarouselManager.Next(), 8000);
    }

    // Método para avançar para o próximo slide
    static Next() {
        CarouselManager._sequence++;
        if (CarouselManager._sequence >= CarouselManager._size) {
            CarouselManager._sequence = 0; // Volta para o primeiro slide se chegar ao final
        }
        CarouselManager._updateSlidePosition();
        CarouselManager._updateDots();
    }

    // Método para voltar para o slide anterior
    static Previous() {
        CarouselManager._sequence--;
        if (CarouselManager._sequence < 0) {
            CarouselManager._sequence = CarouselManager._size - 1; // Vai para o último slide se estiver no primeiro
        }
        CarouselManager._updateSlidePosition();
        CarouselManager._updateDots();
    }

    // Método privado para popular o contêiner de slides com as imagens e conteúdo
    static _populateSlides() {
        CarouselManager._carouselData.forEach(slide => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');

            const img = document.createElement('img');
            img.src = slide.image;
            img.alt = slide.title;
            carouselItem.appendChild(img);

            const content = document.createElement('div');
            content.classList.add('carousel-content');

            const h2 = document.createElement('h2');
            h2.textContent = slide.title;
            content.appendChild(h2);

            if (slide.link && slide.link !== '#') {
                const link = document.createElement('a');
                link.href = slide.link;
                link.textContent = "Ver mais"; // Texto do botão
                link.classList.add('carousel-link');
                content.appendChild(link);
            }

            carouselItem.appendChild(content);
            CarouselManager._slideContainer.appendChild(carouselItem);
        });
    }

    // Método privado para atualizar a posição do slide visível
    static _updateSlidePosition() {
        // Calcula o deslocamento em porcentagem. Cada item tem 100% da largura.
        const offset = -CarouselManager._sequence * 100;
        CarouselManager._slideContainer.style.transform = `translateX(${offset}%)`;
    }

    // Método privado para criar os indicadores de slide (pontinhos)
    static _createDots() {
        for (let i = 0; i < CarouselManager._size; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i; // Armazena o índice do slide
            dot.addEventListener('click', () => CarouselManager._goToSlide(i));
            CarouselManager._dotsContainer.appendChild(dot);
        }
    }

    // Método privado para atualizar o estado dos indicadores de slide
    static _updateDots() {
        const dots = CarouselManager._dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === CarouselManager._sequence) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Método privado para ir para um slide específico clicando no dot
    static _goToSlide(index) {
        clearInterval(CarouselManager._interval); // Para o auto-play ao clicar no dot
        CarouselManager._sequence = index;
        CarouselManager._updateSlidePosition();
        CarouselManager._updateDots();
        // Reinicia o auto-play após um pequeno delay para evitar cliques acidentais
        CarouselManager._interval = setInterval(() => CarouselManager.Next(), 5000);
    }
}