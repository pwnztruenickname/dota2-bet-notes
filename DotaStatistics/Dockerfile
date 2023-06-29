FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["DotaStatistics/DotaStatistics.csproj", "DotaStatistics/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Data/Data.csproj", "Data/"]
COPY ["Core/Core.csproj", "Core/"]
RUN dotnet restore "DotaStatistics/DotaStatistics.csproj"
COPY . .
WORKDIR "/src/DotaStatistics"
RUN dotnet build "DotaStatistics.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DotaStatistics.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DotaStatistics.dll"]
