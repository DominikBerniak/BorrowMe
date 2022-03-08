namespace Core.Model.DataTransferObjects
{
    public class SearchedAnnouncementFilterDto
    {
        public int PageNumber { get; set; } = 1;
        public string? CategoryName { get; set; } = "all";
        public string? VoivodeshipName { get; set; } = "all";
        public string? CityName { get; set; } = "all";
        public string? SearchPhrase { get; set; } = "all";
        public int CostMin { get; set; } = 0;
        public int CostMax { get; set; } = 50;
        public string? SortBy { get; set; } = "publishDate";
        public string? SortDirection { get; set; } = "desc";
    }
}
