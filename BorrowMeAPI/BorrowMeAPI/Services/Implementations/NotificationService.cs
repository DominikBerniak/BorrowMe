using BorrowMeAPI.Services.Interfaces;

namespace BorrowMeAPI.Services.Implementations
{
    public class NotificationService : INotificationService
    {
        public void AddNotification(AvailabilityNotification notification)
        {
            throw new NotImplementedException();
        }

        public AvailabilityNotification GetAllNotifications(int userId)
        {
            throw new NotImplementedException();
        }

        public void RemoveNotification(int userId, int notificationId)
        {
            throw new NotImplementedException();
        }
    }
}
