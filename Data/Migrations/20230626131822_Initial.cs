﻿using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "heroes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор записи")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LocalizedName = table.Column<string>(type: "text", nullable: false, comment: "Наименование"),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_heroes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "teams",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор записи")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false, comment: "Наименование команды")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NickName = table.Column<string>(type: "text", nullable: false),
                    GameRole = table.Column<int>(type: "integer", nullable: false),
                    TeamId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Players_teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "character_in_teams",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор записи")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GameRole = table.Column<string>(type: "text", nullable: false, comment: "Игровая роль"),
                    CharacterId = table.Column<long>(type: "bigint", nullable: false, comment: "Связь с персонажем"),
                    TeamInGameId = table.Column<long>(type: "bigint", nullable: false, comment: "Связь персонажа с конкретным пиком")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_character_in_teams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_character_in_teams_heroes_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "heroes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "games",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор записи")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstTeamId = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор пиков первой команды"),
                    SecondTeamId = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор пиков первой команды"),
                    Comment = table.Column<string>(type: "text", nullable: false, comment: "Комментарий по игре"),
                    GameResult = table.Column<string>(type: "text", nullable: true, comment: "Результат игры")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "team_in_games",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор записи")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GameId = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор игры"),
                    TeamId = table.Column<long>(type: "bigint", nullable: false, comment: "Идентификатор команды"),
                    TeamSide = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_team_in_games", x => x.Id);
                    table.ForeignKey(
                        name: "FK_team_in_games_games_GameId",
                        column: x => x.GameId,
                        principalTable: "games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_team_in_games_teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_character_in_teams_CharacterId",
                table: "character_in_teams",
                column: "CharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_character_in_teams_TeamInGameId",
                table: "character_in_teams",
                column: "TeamInGameId");

            migrationBuilder.CreateIndex(
                name: "IX_games_FirstTeamId",
                table: "games",
                column: "FirstTeamId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_games_SecondTeamId",
                table: "games",
                column: "SecondTeamId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Players_TeamId",
                table: "Players",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_team_in_games_GameId",
                table: "team_in_games",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_team_in_games_TeamId",
                table: "team_in_games",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_character_in_teams_team_in_games_TeamInGameId",
                table: "character_in_teams",
                column: "TeamInGameId",
                principalTable: "team_in_games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_games_team_in_games_FirstTeamId",
                table: "games",
                column: "FirstTeamId",
                principalTable: "team_in_games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_games_team_in_games_SecondTeamId",
                table: "games",
                column: "SecondTeamId",
                principalTable: "team_in_games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_games_team_in_games_FirstTeamId",
                table: "games");

            migrationBuilder.DropForeignKey(
                name: "FK_games_team_in_games_SecondTeamId",
                table: "games");

            migrationBuilder.DropTable(
                name: "character_in_teams");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "heroes");

            migrationBuilder.DropTable(
                name: "team_in_games");

            migrationBuilder.DropTable(
                name: "games");

            migrationBuilder.DropTable(
                name: "teams");
        }
    }
}
