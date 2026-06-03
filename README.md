# Oracle 3D

**Oracle** é um experimento visual em **HTML5**, **CSS** e **Three.js**. Uma esfera interativa que reage ao mouse em 360°, criada puramente como desafio técnico para demonstrar domínio em matemática visual, estilização avançada e performance no ecossistema web.

---

## ✨ Funcionalidades

* **Interatividade em 360°:** A malha 3D reage aos movimentos de clique e arrasto (drag) do ponteiro de forma fluida nos eixos X e Y.
* **Física e Inércia (Lerp):** Implementação de cálculos de atrito e desaceleração para garantir um movimento contínuo e natural após a liberação do mouse.
* **Impulso de Clique:** Ao clicar e soltar, a esfera sofre uma rápida expansão escalar elástica combinada com um ganho imediato de velocidade rotacional.
* **Iluminação e Materiais Dinâmicos:** Uso combinado de `HemisphereLight`, `DirectionalLight` e `PointLight` interagindo com um `MeshPhysicalMaterial` para reflexos de luz e textura realistas.
* **HUD Responsivo:** Interface sobreposta construída com CSS moderno (`clamp()`, `backdrop-filter` para Glassmorphism), garantindo adaptação imediata a dispositivos móveis e desktops.

## 🚀 Tecnologias Utilizadas

* **HTML5:** Estrutura semântica e demarcação da cena (`<canvas>`).
* **CSS3:** Variáveis nativas, modulação de cores em `color-scheme` e design fluido.
* **JavaScript (ES6+):** Lógica de estado direcional e vetores matemáticos para o rastreamento do mouse.
* **Three.js (v0.165.0):** Renderização avançada via WebGL, controle de geometrias (`SphereGeometry`, `Points`), materiais e sistema de câmera e iluminação.


