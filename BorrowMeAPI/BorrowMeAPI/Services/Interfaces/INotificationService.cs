namespace BorrowMeAPI.Services.Interfaces
{
    public interface INotificationService
    {
        // GET all for userID
        AvailabilityNotification GetAllNotifications(int userId);

        // POST
        void AddNotification(AvailabilityNotification notification);

        // DELETE
        void RemoveNotification(int userId, int notificationId);
    }
}
