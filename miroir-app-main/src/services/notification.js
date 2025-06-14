// Service de notifications

// Classe pour gérer les notifications
class NotificationService {
  constructor() {
    this.listeners = [];
    this.notifications = [];
  }

  // Ajouter une notification
  addNotification(notification) {
    const newNotification = {
      id: Date.now(),
      read: false,
      createdAt: new Date(),
      ...notification
    };
    
    this.notifications.unshift(newNotification);
    
    // Limiter à 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }
    
    // Notifier les abonnés
    this.notifyListeners();
    
    return newNotification;
  }

  // Marquer une notification comme lue
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notifyListeners();
    }
  }

  // Marquer toutes les notifications comme lues
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.notifyListeners();
  }

  // Supprimer une notification
  removeNotification(notificationId) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.notifyListeners();
  }

  // Obtenir toutes les notifications
  getNotifications() {
    return [...this.notifications];
  }

  // Obtenir le nombre de notifications non lues
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  // S'abonner aux changements de notifications
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notifier tous les abonnés
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.notifications));
  }
}

// Exporter une instance unique du service
export const notificationService = new NotificationService();

// Types de notifications
export const NOTIFICATION_TYPES = {
  NEW_PERCEPTION: 'NEW_PERCEPTION',
  NEW_MATCH: 'NEW_MATCH',
  NEW_MESSAGE: 'NEW_MESSAGE',
  PROFILE_VIEW: 'PROFILE_VIEW',
  SYSTEM: 'SYSTEM'
};
