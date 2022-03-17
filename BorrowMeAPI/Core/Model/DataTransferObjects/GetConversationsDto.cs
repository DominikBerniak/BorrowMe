using Domain.Entieties;

namespace Core.Model.DataTransferObjects
{
    public class GetConversationsDto
    {
        public List<ConversationAnnouncementDto> Announcements { get; set; } = new List<ConversationAnnouncementDto>();
        public List<ConversationReservationDto> Reservations { get; set; } = new List<ConversationReservationDto>();
    }

    public class ConversationAnnouncementDto : ConversationAnnouncementBase
    {
        public List<ConversationReservationBase> Reservations { get; set; } = new List<ConversationReservationBase>();
    }

    public class ConversationReservationDto : ConversationAnnouncementBase
    {
        public Guid ReservationId { get; set; }
        public ReservationDates ReservationDates { get; set; }
        public ConversationUser AnnouncementOwner { get; set; }
    }

    public class ConversationAnnouncementBase
    {
        public string AnnouncementTitle { get; set; }
        public string AnnouncementCity { get; set; }
        public string AnnouncementVoivodeship { get; set; }
    }

    public class ConversationReservationBase
    {
        public Guid ReservationId { get; set; }
        public ConversationUser Owner { get; set; }
        public ReservationDates ReservationDates { get; set; }
    }

    public class ReservationDates
    {
        public DateTime StartDay { get; set; }
        public DateTime EndDay { get; set; }
    }

    public class ConversationUser : MessageUserDto
    {
        public string? AvatarName { get; set; }
    }
}
