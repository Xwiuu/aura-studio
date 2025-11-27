# ✦ AURÆ STUDIO

> **"Where Stillness Becomes Motion."**
> Uma experiência web imersiva focada em microinterações, física líquida e narrativa cinematográfica.

![Project Status](https://img.shields.io/badge/Status-Finished-000000?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Python_|_FastAPI_|_GSAP-F4EFE8?style=for-the-badge&labelColor=black)

---

## 📜 Sobre o Projeto

**AURÆ STUDIO** é uma Landing Page conceitual desenvolvida para explorar os limites entre **Engenharia de Software** e **Creative Coding**. 

Ao contrário dos SPAs tradicionais carregados de JavaScript, este projeto utiliza **Python (FastAPI)** no backend para servir uma estrutura leve, enquanto **GSAP** e **Vanilla JS** cuidam da física e das animações no frontend. O objetivo foi criar uma interface que parece "viva", reagindo organicamente a cada movimento do usuário.

### ✨ Destaques da Experiência

1.  **Aura Cursor Physics:** Um sistema de cursor personalizado com física líquida (LERP) que simula uma luz atmosférica seguindo o mouse com inércia natural.
2.  **Kinetic Typography:** Textos que sofrem distorção (skew) baseada na velocidade do scroll do usuário (Inércia Visual).
3.  **3D Living Gallery:** Imagens que respondem à posição do mouse com inclinação tridimensional e parallax reverso.
4.  **The Horizon Tunnel:** Uma seção de scroll horizontal "pinada" que altera a atmosfera (cores) da página enquanto o usuário navega.
5.  **Entropy Lab:** Um algoritmo de descriptografia visual e manipulação de strings (efeito Matrix/Hacker) acionado por interação.
6.  **Python Powered Footer:** Rodapé tecnológico que exibe dados de renderização do servidor em tempo real (`Render Time`).

---

## 🛠️ Tech Stack

Este projeto foi construído sem frameworks frontend pesados (React/Vue), focando na pureza do código e performance.

* **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.x) - Para alta performance e SSR (Server Side Rendering) com Jinja2.
* **Frontend:** HTML5 Semântico + [Tailwind CSS](https://tailwindcss.com/).
* **Motion & Physics:** [GSAP 3](https://greensock.com/gsap/) (Core, ScrollTrigger).
* **Templating:** Jinja2.

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para levantar a atmosfera do AURÆ na sua máquina.

### Pré-requisitos
* Python 3.8+ instalado.

### Instalação

1.  **Clone o repositório**
    ```bash
    git clone [https://github.com/Xwiuu/aura-studio.git](https://github.com/Xwiuu/aura-studio.git)
    cd aura-studio
    ```

2.  **Crie um ambiente virtual (Opcional, mas recomendado)**
    ```bash
    # Windows
    python -m venv venv
    .\venv\Scripts\activate

    # Mac/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Instale as dependências**
    ```bash
    pip install fastapi uvicorn jinja2
    ```

4.  **Inicie o servidor**
    ```bash
    uvicorn main:app --reload
    ```

5.  **Acesse o projeto**
    Abra seu navegador em: `http://127.0.0.1:8000`

---

## 📂 Estrutura do Projeto

```text
aura_project/
├── main.py              # Coração da aplicação (FastAPI)
├── requirements.txt     # Dependências do Python
├── static/
│   ├── css/
│   │   └── style.css    # Estilização cinematográfica e efeitos de Noise
│   └── js/
│       └── script.js    # Lógica de animação, GSAP e Física
└── templates/
    └── index.html       # Estrutura HTML + Jinja2 Templates

---

## 🧠 Conceitos de Engenharia Aplicados

Linear Interpolation (LERP): Usado no cursor para criar suavidade matemática no movimento.

DOM Manipulation Performance: Uso de will-change e transform3d para garantir renderização via GPU e evitar repaints custosos.

Event Throttling (via GSAP Ticker): Otimização do loop de renderização para manter 60fps mesmo com múltiplos listeners de mouse.

Server-Side Render (SSR): Geração dinâmica de conteúdo HTML via Python para SEO e performance inicial.

---

