---
title: markmap
markmap:
  colorFreezeLevel: 2
---

## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Note that if blocks and lists appear at the same level, the lists will be ignored.

### Lists

- **strong** ~~del~~ *italic* ==highlight==
- `inline code`
- [x] checkbox
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text with the `maxWidth` option
- Ordered list
  1. item 1
  2. item 2

### Blocks

```js
console.log('hello, JavaScript')
```

| Products | Price |
|-|-|
| Apple | 4 |
| Banana | 2 |

![](https://markmap.js.org/favicon.png)

---

# **Guía del Principiante para Angular 4: Componentes**  
**Autor original**: Roy Agasthyan  
**Traducción**: Rafael Chavarría  

## **1. Introducción**  
- Angular es un marco de trabajo para desarrollar frontends en aplicaciones web/móviles.  
- Los **componentes** son bloques fundamentales en Angular, definidos con el decorador `@Component`.  
- Ejemplo práctico: Creación de una calculadora usando componentes.

## **2. Configuración Inicial**  
1. Instalar Angular CLI:  
   ```bash
   npm install -g @angular/cli
   ```  
2. Crear una nueva aplicación:  
   ```bash
   ng new angular-app
   cd angular-app
   ng serve
   ```  
   - La aplicación estará en `http://localhost:4200`.

## **3. Estructura de una Aplicación Angular**  
- **Módulo raíz**: Definido en `app.module.ts`.  
  - Declara el componente principal (`AppComponent` en `app.component.ts`).  
- **Componente**: Usa `@Component` con:  
  - `selector`: Etiqueta HTML para incrustar el componente.  
  - `templateUrl`: Plantilla asociada.  
  - `styleUrls`: Estilos CSS.  

## **4. Creación del Componente `CalculatorComponent`**  
- **Pasos**:  
  1. Crear carpeta `src/app/calc` y archivos:  
     - `calc.component.html` (plantilla).  
     - `calc.component.ts` (lógica).  
     - `calc.component.css` (estilos).  
  2. Definir el componente en `calc.component.ts`:  
     ```typescript
     @Component({
       selector: 'calc',
       templateUrl: 'calc.component.html',
       styleUrls: ['calc.component.css']
     })
     export class CalcComponent { ... }
     ```  
  3. Registrar el componente en `app.module.ts` (en `declarations`).

## **5. Funcionalidad de la Calculadora**  
- **Variables y Binding**:  
  - Usar `[(ngModel)]` para vincular inputs (`number1`, `number2`).  
- **Método `add()`**:  
  ```typescript
  public add() {
    this.result = this.number1 + this.number2;
  }
  ```  
- **Plantilla**:  
  ```html
  <button (click)="add()">Add</button>
  <div>Result: {{ result }}</div>
  ```  

### **6. Resultado Final**  
- Interfaz con dos campos de entrada, botón y resultado dinámico.  
- **Estilos**: Diseño responsivo usando clases CSS (ej. `col-6` para 50% de ancho).  

### **7. Conclusión**  
- Los componentes son esenciales en Angular y permiten modularizar la interfaz.  
- **Código fuente**: Disponible en [GitHub](https://github.com/royagasthyan/AngularComponent).  

---  
## **Notas Clave**  
- **Decorador `@Component`**: Define metadatos del componente.  
- **Data Binding**: `ngModel` para sincronizar datos entre vista y lógica.  
- **Eventos**: `(click)` para acciones de usuario.  
- **Estructura clara**: Separación entre HTML, CSS y TypeScript.  
