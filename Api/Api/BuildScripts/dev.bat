dotnet clean ..\Api.csproj --configuration Debug
dotnet restore ..\..\ArangarApi.sln
dotnet build --no-incremental ..\Api.csproj --configuration Debug
RMDIR ..\Artifacts\Development\ /s/q
dotnet publish -c Debug --output ..\Artifacts\Development\ ..\Api.csproj