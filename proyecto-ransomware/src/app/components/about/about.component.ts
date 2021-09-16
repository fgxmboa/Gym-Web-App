import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public universidad: string;

  constructor() { 
    this.title = "Francisco Gamboa";
    this.subtitle = "Proyecto Ransomware";
    this.universidad = "Universidad Central";
  }

  ngOnInit(): void {
  }

}
