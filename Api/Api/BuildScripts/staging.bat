dotnet clean ..\Api.csproj --configuration Stage
dotnet restore ..\..\ArangarApi.sln
dotnet build --no-incremental ..\Api.csproj --configuration Stage
RMDIR ..\Artifacts\Staging\ /s/q
dotnet publish -c Stage --output ..\Artifacts\Staging\ ..\Api.csproj