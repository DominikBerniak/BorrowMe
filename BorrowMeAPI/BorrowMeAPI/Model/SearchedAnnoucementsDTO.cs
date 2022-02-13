namespace BorrowMeAPI.Model
{
    public class SearchedAnnoucementsDTO
    {
        public int NumberOfPages { get; set; }
        public int CurrentPage { get; set; }
        public List<Announcement> Announcements { get; set; }

    }
}
