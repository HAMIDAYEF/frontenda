import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  isCollapsed = false;
  isProprietaire = false;   // ← Pour cacher Statistiques

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  private checkUserRole(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.isProprietaire = user.role?.toLowerCase() === 'proprietaire';
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}