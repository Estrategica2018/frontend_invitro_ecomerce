import { Component, HostListener, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {

  largeScreen = window.innerWidth >= 1200;
  mediumScreen = window.innerWidth >= 800 && window.innerWidth < 1200;

  appFooterPages = [
    {
      "title": "Información",
      "size": 2,
      "subMmenu": [
        { title: "Inicio", url: "/Inicio"},
        { title: "Acerca de", url: "/Acerca_de"},
        { title: "Contacto", url: "/Contacto"}
      ]
    },
    {
      "title": "Productos",
      "size": 2,
      "subMmenu": [
        { title: "Catálogo de toros", url: "/Inicio", icon: "mail" },
        { title: "Catálogo de vacas", url: "/Acerca_de", icon: "paper-plane" },
        { title: "Otros productos", url: "/Servicios", icon: "heart" }
      ]
    },
    {
      "title": "Servicios",
      "size": 3,
      "subMmenu": [
        { title: "Evaluación de receptoras", url: "/Inicio", icon: "mail" },
        { title: "Evaluación de donadoras", url: "/Acerca_de", icon: "paper-plane" },
        { title: "Sincronización de receptoras", url: "/Servicios", icon: "heart" },
        { title: "Aspiración folicular", url: "/Productos", icon: "archive" },
        { title: "Fertilización In vitro", url: "/Contacto", icon: "trash" },
        { title: "Transferencia de embriones", url: "/Contacto", icon: "trash" },
        { title: "Diagnóstico de gestación y entrega de preñeces", url: "/Contacto", icon: "trash" }
      ]
    }
  ];

  contact = {
    "url_icon": "https://res.cloudinary.com/deueufyac/image/upload/v1657912035/e-commerce/icon-invitro_xnxxjq.png",
    "address": "Calle 68b #72-56, Bogotá, Colombia",
    "phone": "(+57) 3125465272",
    "phone2": "",
    "email": "operaciones@invitro.com",
    "socialMedia": [
      { "icon": "facebook", "url": "" },
      { "icon": "twitter", "url": "" },
      { "icon": "google", "url": "" },
      { "icon": "instagram", "url": "" },
      { "icon": "pinterest", "url": "" },
      { "icon": "snapchat", "url": "" }]
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  goToUrl(url: string) {
    this.router.navigate([url]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 1012;
    this.mediumScreen = event.target.innerWidth >= 800 && event.target.innerWidth < 1200;
  }
}
