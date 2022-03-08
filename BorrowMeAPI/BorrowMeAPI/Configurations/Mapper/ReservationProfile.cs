using AutoMapper;
using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Api.Configurations.Mapper
{
    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {
            CreateMap<GetReservationDto, Reservation>().ReverseMap();
        }
    }
}
