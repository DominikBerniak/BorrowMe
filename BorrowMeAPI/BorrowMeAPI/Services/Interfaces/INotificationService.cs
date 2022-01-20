using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface INotificationService
    {
        // GET all for userID
        Notification GetAllNotifications(Guid userId);
        
        // POST
        void AddNotification(Notification notification);

        // DELETE
        void RemoveNotification(Guid userId, Guid notificationId);
    }
}
