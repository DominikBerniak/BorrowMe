using AutoMapper;
using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Api.Configurations.Mapper
{
    public class MessageProfile : Profile
    {
        public MessageProfile()
        {
            CreateMap<CreateMessageDTO, Message>().ReverseMap();
            CreateMap<Message, GetMessageDTO>().ReverseMap();
            CreateMap<User, MessageUserDto>().ReverseMap();
        }
    }
}
