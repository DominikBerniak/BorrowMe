using Core.Model.DataTransferObjects;
using Core.Repositories;
using Core.Repositories.Interfaces;
using Core.Services.Interfaces;
using Domain.Entieties;
using System;

namespace Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IReservationRepository _reservationRepository;

        public UserService(IUserRepository repository, 
            IAnnouncementRepository announcementRepository, IReservationRepository reservationRepository)
        {
            _userRepository = repository;
            _announcementRepository = announcementRepository;
            _reservationRepository = reservationRepository;
        }

        public async Task<User> GetUser(Guid userId)
        {
            var user = await _userRepository.GetUserById(userId);
            return user;
        }

        public async Task<User> GetUser(string email)
        {
            var user = await _userRepository.GetByProperty(u =>  u.Email == email);
            return user;
        }

        public async Task<User> AddUser(CreateUserDto userData)
        {
            var user = new User
            {
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                Email = userData.Email,
            };
            return await _userRepository.Add(user);
        }

        public async Task<GetConversationsDto> GetUserConversations(Guid id)
        {
            var conversations = new GetConversationsDto();
            await PopulateConversationsAnnouncements(conversations, id);
            await PopulateConversationsReservations(conversations, id);
            return conversations;
        }

        private async Task PopulateConversationsAnnouncements(GetConversationsDto conversations, Guid userId)
        {
            var announcements = await _announcementRepository.GetUserAnnouncemntsWithLocation(userId);
            foreach (var announcement in announcements)
            {
                var conversationAnnouncementData = new ConversationAnnouncementDto
                {
                    AnnouncementTitle = announcement.Title,
                    AnnouncementCity = announcement.City.Name,
                    AnnouncementVoivodeship = announcement.Voivodeship.Name
                };
                var reservations = await _reservationRepository.GetReservationsByAnnouncementIdIncludeUser(announcement.Id);
                if (reservations.Count == 0)
                {
                    continue;
                }
                foreach (var reservation in reservations)
                {
                    conversationAnnouncementData.Reservations.Add(new ConversationReservationBase
                    {
                        ReservationId = reservation.Id,
                        ReservationDates = new ReservationDates
                        {
                            StartDay = reservation.ReservationStartDay,
                            EndDay = reservation.ReservationEndDay
                        },
                        Owner = new ConversationUser
                        {
                            Id = reservation.User.Id,
                            FirstName = reservation.User.FirstName,
                            LastName = reservation.User.LastName,
                            Email = reservation.User.Email,
                            AvatarName = reservation.User.PictureLocation?.FileName
                        }
                    });
                }
                conversations.Announcements.Add(conversationAnnouncementData);
            }
        }

        private async Task PopulateConversationsReservations(GetConversationsDto conversations, Guid userId)
        {
            var reservations = await _reservationRepository.GetReservationsByUserIdIncludeAnnouncementLocation(userId);
            if (reservations.Count == 0)
            {
                return;
            }
            foreach (var reservation in reservations)
            {
                var conversationReservationDto = new ConversationReservationDto
                {
                    ReservationId = reservation.Id,
                    ReservationDates = new ReservationDates
                    {
                        StartDay = reservation.ReservationStartDay,
                        EndDay = reservation.ReservationEndDay
                    },
                    AnnouncementTitle = reservation.Announcement.Title,
                    AnnouncementCity = reservation.Announcement.City.Name,
                    AnnouncementVoivodeship = reservation.Announcement.Voivodeship.Name,
                    AnnouncementOwner = new ConversationUser
                    {
                        Id = reservation.Announcement.Owner.Id,
                        FirstName = reservation.Announcement.Owner.FirstName,
                        LastName = reservation.Announcement.Owner.LastName,
                        Email = reservation.Announcement.Owner.Email,
                        AvatarName = reservation.Announcement.Owner.PictureLocation?.FileName
                    }
                };
                conversations.Reservations.Add(conversationReservationDto);
            }
        }

        public async Task<User> UpdateUser(User userData)
        {
            return await _userRepository.Edit(userData);
        }
    }
}