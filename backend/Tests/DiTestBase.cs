using Application.Mapping;
using Data;
using Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Tests
{
    public abstract class DiTestBase
    {
        protected IServiceCollection ServiceCollection;

        protected IServiceProvider _provider;

        private DataContext _dbContext ;

        private bool _isInMemoryDb;
        
        [OneTimeSetUp]
        public void DiSetup()
        {
            _provider = null;
            _dbContext = null;

            ServiceCollection = new ServiceCollection();

            OnDbContextAdd();

            ServiceCollection.AddAutoMapper(
                typeof(HeroDtoMappingProfile).Assembly
                );
        }

        [OneTimeTearDown]
        public void BaseCleanup()
        {
            _dbContext?.Dispose();
            _dbContext = null;
        }

        /// <summary>
        ///    Регистрирует сервис в DI контейнере 
        /// </summary>
        protected void Register<TService, TImpl>(ServiceLifetime lifetime = ServiceLifetime.Transient)
            where TService : class
            where TImpl : class, TService
        {
            var desc = new ServiceDescriptor(typeof(TService), typeof(TImpl), lifetime);
            AddOrReplace(desc);
        }

        /// <summary>
        ///    Регистрирует экзепляр сервиса в DI контейнере 
        /// </summary>
        protected void Register<TService>(ServiceLifetime lifetime = ServiceLifetime.Transient)
            where TService : class
        {
            var desc = new ServiceDescriptor(typeof(TService), typeof(TService), lifetime);
            AddOrReplace(desc);
        }
        
        /// <summary>
        /// Производит действией в транзакции
        /// </summary>
        protected async Task InTransaction(Func<Task> func)
        {
            var dbContext = await GetDbContext();

            await using var transaction = await dbContext.Database.BeginTransactionAsync();

            await func();

            await dbContext.SaveChangesAsync();

            await transaction.CommitAsync();
        }

        /// <summary>
        /// Получает контекст БД
        /// </summary>
        protected async Task<DataContext> GetDbContext()
        {
            if (_dbContext != null)
                return _dbContext;

            _dbContext = GetServiceProvider().GetRequiredService<DataContext>();

            await InitDbContext(_dbContext);

            if (_dbContext.ChangeTracker.HasChanges())
                await _dbContext.SaveChangesAsync();

            return _dbContext;
        }

        /// <summary>
        /// Получает экземпляр DI контейнера
        /// </summary>
        protected IServiceProvider GetServiceProvider()
        {
            if (_provider != null)
                return _provider;

            RebuildServiceProvider();

            return _provider;
        }
        
        /// <summary>
        /// Перестроение сервис провайдера
        /// </summary>
        protected void RebuildServiceProvider()
        {
            _provider = ServiceCollection.BuildServiceProvider();
        }
        
        /// <summary>
        /// Инициализирует контекст БД и делает сидинг в него
        /// </summary>
        protected virtual async Task InitDbContext(DataContext dbContext)
        {
            var teams = new List<Team>
            {
                new Team
                {
                    Id = 1,
                    Name = "9Pandas"
                },
                new Team
                {
                    Id = 2,
                    Name = "BetBoom"
                }
            };

            var heroes = new List<Hero>
            {
                new Hero
                {
                    Id = 1,
                    Name = "Huskar",
                    LocalizedName = "Huskar"
                },
                new Hero
                {
                    Id = 2,
                    Name = "Sniper",
                    LocalizedName =  "Sniper"
                },
                new Hero
                {
                    Id = 3,
                    Name = "Tini",
                    LocalizedName = "Tini"
                },
                new Hero
                {
                    Id = 4,
                    Name = "Tuskar",
                    LocalizedName = "Tuskar"
                },
                new Hero
                {
                    Id = 5,
                    Name = "Disruptor",
                    LocalizedName = "Disruptor"
                },
                new Hero
                {
                    Id = 6,
                    Name = "Shadow demon",
                    LocalizedName = "Shadow demon"
                },
                new Hero
                {
                    Id = 7,
                    Name = "Drow Ranger",
                    LocalizedName = "Drow Ranger"
                },
                new Hero
                {
                    Id = 8,
                    Name = "Anti-mage",
                    LocalizedName = "Anti-mage"
                },
                new Hero
                {
                    Id = 9,
                    Name = "Bane",
                    LocalizedName = "Bane"
                },
                new Hero
                {
                    Id = 10,
                    Name = "Bloodseeker",
                    LocalizedName = "Bloodseeker"
                }
            };
            
            await _dbContext.Teams.AddRangeAsync(teams);
            await _dbContext.Heroes.AddRangeAsync(heroes);
            await dbContext.SaveChangesAsync();

            var game = new Game
            {
                Id = 1,
                FirstTeam = new TeamInGame
                {
                    TeamId = 1,
                    CharactersInTeam = new List<CharacterInTeam>
                    {
                        new CharacterInTeam{Id = 1, CharacterId = 1},
                        new CharacterInTeam{Id = 2, CharacterId = 2},
                        new CharacterInTeam{Id = 3, CharacterId = 3},
                        new CharacterInTeam{Id = 4, CharacterId = 4},
                        new CharacterInTeam{Id = 5, CharacterId = 5},
                    }
                },
                SecondTeam = new TeamInGame
                {
                    TeamId = 2,
                    CharactersInTeam = new List<CharacterInTeam>
                    {
                        new CharacterInTeam{Id = 6, CharacterId = 6},
                        new CharacterInTeam{Id = 7, CharacterId = 7},
                        new CharacterInTeam{Id = 8, CharacterId = 8},
                        new CharacterInTeam{Id = 9, CharacterId = 9},
                        new CharacterInTeam{Id = 10, CharacterId = 10},
                    }
                },
                Comment = "test"
            };

            
            await dbContext.Games.AddAsync(game);
            await dbContext.SaveChangesAsync();

        }

        /// <summary>
        /// Добавляет контекст БД
        /// </summary>
        protected virtual void OnDbContextAdd()
        {
            UseInMemoryDb(); //Использовать InMemoryDb
        }


        /// <summary>
        /// Использовать InMemory БД
        /// </summary>
        protected void UseInMemoryDb()
        {
            _isInMemoryDb = true;

            ServiceCollection.AddEntityFrameworkInMemoryDatabase();
            ServiceCollection.AddDbContext<DataContext>((provider, builder) =>
            {
                builder
                    .UseInMemoryDatabase("temp_db_" + DateTime.UtcNow.ToFileTimeUtc())
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging();
            });
        }

        /// <summary>
        /// Выполняет регистрацию <see cref="IOptions{TOptions}"/> в <see cref="IServiceCollection"/>
        /// </summary>
        protected void RegisterOptions<TConfig>(Func<TConfig> createConfig)
            where TConfig : class
        {
            IOptions<TConfig> settingsOptions = Options.Create(createConfig.Invoke());
            ServiceCollection.AddSingleton(settingsOptions);
        }

        private void AddOrReplace(ServiceDescriptor desc)
        {
            var oldDesc = ServiceCollection.FirstOrDefault(x => x.ServiceType == desc.ServiceType);
            if (oldDesc != null)
                ServiceCollection.Remove(oldDesc);

            ServiceCollection.Add(desc);
        }
    }

    public abstract class DiTestBase<TService> : DiTestBase
    {
        /// <summary>
        /// Получает тестируемый сервис
        /// </summary>
        protected virtual TService GetTestingService()
            => GetServiceProvider().GetRequiredService<TService>();
    }
}
