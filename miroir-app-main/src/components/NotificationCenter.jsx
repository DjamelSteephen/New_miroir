import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { notificationService, NOTIFICATION_TYPES } from '../services/notification';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  
  // S'abonner aux notifications
  useEffect(() => {
    const unsubscribe = notificationService.subscribe(updatedNotifications => {
      setNotifications(updatedNotifications);
      setUnreadCount(notificationService.getUnreadCount());
    });
    
    // Charger les notifications initiales
    setNotifications(notificationService.getNotifications());
    setUnreadCount(notificationService.getUnreadCount());
    
    return unsubscribe;
  }, []);
  
  // Marquer toutes les notifications comme lues lors de l'ouverture
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      notificationService.markAllAsRead();
    }
  }, [isOpen, unreadCount]);
  
  // Gérer le clic sur une notification
  const handleNotificationClick = (notification) => {
    notificationService.markAsRead(notification.id);
    
    // Naviguer vers la page appropriée en fonction du type de notification
    switch (notification.type) {
      case NOTIFICATION_TYPES.NEW_PERCEPTION:
        navigate('/profil');
        break;
      case NOTIFICATION_TYPES.NEW_MATCH:
      case NOTIFICATION_TYPES.NEW_MESSAGE:
        navigate('/messages');
        break;
      case NOTIFICATION_TYPES.PROFILE_VIEW:
        navigate('/profil');
        break;
      default:
        break;
    }
    
    setIsOpen(false);
  };
  
  // Icône en fonction du type de notification
  const getNotificationIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.NEW_PERCEPTION:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case NOTIFICATION_TYPES.NEW_MATCH:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case NOTIFICATION_TYPES.NEW_MESSAGE:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case NOTIFICATION_TYPES.PROFILE_VIEW:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };
  
  // Formatter la date
  const formatDate = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} min`;
    } else if (diffHours < 24) {
      return `${diffHours} h`;
    } else if (diffDays < 7) {
      return `${diffDays} j`;
    } else {
      return notifDate.toLocaleDateString();
    }
  };

  return (
    <div className="relative">
      {/* Bouton de notification avec compteur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-blue-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Panneau de notifications */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-80 bg-black/80 backdrop-blur-md rounded-xl border border-blue-500/20 shadow-xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 border-b border-blue-900/30 flex justify-between items-center">
              <h3 className="font-medium">Notifications</h3>
              <button
                onClick={() => notificationService.markAllAsRead()}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Tout marquer comme lu
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                  Aucune notification
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-blue-900/30 hover:bg-blue-900/20 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-900/10' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 pt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
