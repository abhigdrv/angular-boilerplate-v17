import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit {
  htmlContent: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const htmlFileName:any = this.route.snapshot.paramMap.get('fileName');
    this.loadHtmlContent(htmlFileName);
  }

  private loadHtmlContent(fileName: string): void {
    // Assuming your HTML files are in the "html-files" folder
    const filePath = `./assets/html-files/${fileName}`;
    fetch(filePath)
      .then(response => response.text())
      .then(html => this.htmlContent = html);
  }
}
