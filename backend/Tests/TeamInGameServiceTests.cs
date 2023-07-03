using Application.Dtos;
using Application.Services.TeamInGame;
using Microsoft.EntityFrameworkCore;

namespace Tests;

public class TeamInGameServiceTests : DiTestBase<ITeamInGameService>
{
    [OneTimeSetUp]
    public void Setup()
    {
        Register<ITeamInGameService, TeamInGameService>();
    }

    [Test]
    public async Task Get_Game_Ids_By_Character_Setup()
    {
        //Arrange
        await GetDbContext();
        var service = GetTestingService();
        
        //Act
        var gameIds = await service.GetGameIdsByCharacterSetup(new GameWithCharacterSetupSearchDto
            { TeamId = 1, SetupCharacterIds = new[] { 1L, 2, 3 } });
        
        //Assert
        Assert.That(gameIds.Count(), Is.EqualTo(1L));

    }
}