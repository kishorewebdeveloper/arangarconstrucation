dotnet clean ..\Api.csproj --configuration Release
dotnet restore ..\..\ArangarApi.sln
dotnet build --no-incremental ..\Api.csproj --configuration Release
RMDIR ..\Artifacts\Production\ /s/q
dotnet publish -c Release --output ..\Artifacts\Production\ ..\Api.csproj