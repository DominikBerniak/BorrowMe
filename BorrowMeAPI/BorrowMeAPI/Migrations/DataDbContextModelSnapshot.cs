﻿// <auto-generated />
using System;
using BorrowMeAPI.Dao;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BorrowMeAPI.Migrations
{
    [DbContext(typeof(DataDbContext))]
    partial class DataDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("BorrowMeAPI.Model.Announcement", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CityId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("OtherPaymentType")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("OwnerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("PaymentType")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<decimal?>("Price")
                        .HasPrecision(6, 2)
                        .HasColumnType("decimal(6,2)");

                    b.Property<DateTime>("PublishDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("SubCategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("OwnerId");

                    b.HasIndex("SubCategoryId");

                    b.ToTable("Announcements");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.AvailabilityNotification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CityId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("UserId");

                    b.ToTable("AvailabilityNotifications");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.City", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("VoivodeshipId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("VoivodeshipId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.Entieties.SubCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("MainCategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("MainCategoryId");

                    b.ToTable("SubCategories");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.MainCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("MainCategories");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.PicturePath", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("AnnouncementId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DirectoryName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("AnnouncementId");

                    b.ToTable("PictureLocations");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.Reservation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AnnouncementId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("bit");

                    b.Property<DateTime>("ReservationEndDay")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ReservationStartDay")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("AnnouncementId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<Guid?>("PictureLocationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ReputationPoints")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PictureLocationId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.Voivodeship", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Voivodeships");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.Announcement", b =>
                {
                    b.HasOne("BorrowMeAPI.Model.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BorrowMeAPI.Model.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BorrowMeAPI.Model.Entieties.SubCategory", "SubCategory")
                        .WithMany()
                        .HasForeignKey("SubCategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("City");

                    b.Navigation("Owner");

                    b.Navigation("SubCategory");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.AvailabilityNotification", b =>
                {
                    b.HasOne("BorrowMeAPI.Model.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BorrowMeAPI.Model.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("City");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.City", b =>
                {
                    b.HasOne("BorrowMeAPI.Model.Voivodeship", "Voivodeship")
                        .WithMany()
                        .HasForeignKey("VoivodeshipId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Voivodeship");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.Entieties.SubCategory", b =>
                {
                    b.HasOne("BorrowMeAPI.Model.MainCategory", null)
                        .WithMany("SubCategories")
                        .HasForeignKey("MainCategoryId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("BorrowMeAPI.Model.PicturePath", b =>
                {
                    b.HasOne("BorrowMeAPI.Model.Announcement", null)
                        .WithMany("PictureLocations")
                        .HasForeignKey("AnnouncementId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("BorrowMeAPI.Model.Reservation", b =>
                {
                    b.HasOne("BorrowMeAPI.Model.Announcement", "Announcement")
                        .WithMany()
                        .HasForeignKey("AnnouncementId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BorrowMeAPI.Model.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Announcement");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.User", b =>
                {
                    b.HasOne("BorrowMeAPI.Model.PicturePath", "PictureLocation")
                        .WithMany()
                        .HasForeignKey("PictureLocationId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("PictureLocation");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.Announcement", b =>
                {
                    b.Navigation("PictureLocations");
                });

            modelBuilder.Entity("BorrowMeAPI.Model.MainCategory", b =>
                {
                    b.Navigation("SubCategories");
                });
#pragma warning restore 612, 618
        }
    }
}
