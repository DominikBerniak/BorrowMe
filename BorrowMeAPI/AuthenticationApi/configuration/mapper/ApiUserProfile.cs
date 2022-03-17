using AutoMapper;
using BorrowMeAuth.Areas.Identity.Data;
using BorrowMeAuth.DTO;
using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace MyHotels.WebApi.Configurations.Mapper
{
    public class ApiUserProfile : Profile
    {
        public ApiUserProfile()
        {
            CreateMap<BorrowMeAuthUser, LoginApiUserDto>().ReverseMap();
            CreateMap<BorrowMeAuthUser, RegisterApiUserDto>().ReverseMap();
            CreateMap<CreateUserDto, RegisterApiUserDto>().ReverseMap();
            CreateMap<User, EditApiUserDto>().ReverseMap();
        }
    }
}
