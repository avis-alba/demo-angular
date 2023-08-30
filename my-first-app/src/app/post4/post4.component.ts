import { Component } from "@angular/core";

@Component({
    selector: 'app-post4',
    template: `
        <div class="post4">
            <h2>Шаблон</h2>
            <p>Добавление шаблона и стилей для компонента в декораторе @Component</p>
        </div>
    `,
    styles: [`
        h2, p {
            color: white;
        }
        .post4 {
            width: 250px;
            margin: 20px;
            background-color: #1976d2;
            border: 2px dashed #f44336;
            text-align: center;
        }
    `]
})
export class Post4Component {}