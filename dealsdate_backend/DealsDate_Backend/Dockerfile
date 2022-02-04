#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["DealsDate_Backend/DealsDate_Backend.csproj", "DealsDate_Backend/"]
RUN dotnet restore "DealsDate_Backend/DealsDate_Backend.csproj"
COPY . .
WORKDIR "/src/DealsDate_Backend"
RUN dotnet build "DealsDate_Backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DealsDate_Backend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DealsDate_Backend.dll"]