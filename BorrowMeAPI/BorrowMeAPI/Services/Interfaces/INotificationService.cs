using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface INotificationService
    {
        // GET all for userID
        Notification GetAllNotifications(int userId);
        
        // POST
        void AddNotification(Notification notification);

        // DELETE
        void RemoveNotification(int userId, int notificationId);
    }
}
