dotnet clean ..\Api.csproj --configuration Testing
dotnet restore ..\..\ArangarApi.sln
dotnet build --no-incremental ..\Api.csproj --configuration Testing
RMDIR ..\Artifacts\Testing\ /s/q
dotnet publish -c Testing --output ..\Artifacts\Testing\ ..\Api.csproj