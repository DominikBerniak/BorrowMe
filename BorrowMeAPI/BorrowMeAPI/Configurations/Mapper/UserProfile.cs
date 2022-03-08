using AutoMapper;
using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Api.Configurations.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<GetUserDto, User>().ReverseMap();
        }
    }
}
