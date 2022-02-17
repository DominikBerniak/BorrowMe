﻿namespace BorrowMeAPI.Model.DataTransferObjects
{
    public class FilteredAnnoucementsDto
    {
        public List<Announcement> Announcements { get; set; } = new List<Announcement>();
        public int NumberOfPages { get; set; }
        public Status Status { get; set; }

    }
    public enum Status
    {
        Ok,
        NotFound,
        BadRequest
    }
}
