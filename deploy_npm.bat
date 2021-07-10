@echo off
@chcp 1250 >nul

CALL prepare.bat
CALL build.bat
CALL test.bat

ECHO Po pojawieniu się "Username" podaj login do rejestru NPM
CALL npm login

ECHO Jestes poprawnie zalogowany jako:
CALL npm whoami

ECHO.
ECHO Po zapisaniu zmian w notatniku wróc do konsoli i wciśnij enter
REM Otwiera notepad aby zmieni� wersje ####################################
notepad package.json

ECHO Po wci�ni�ciu enter zmiany b�d� publikowane w rejestrze NPM
ECHO.
pause >nul
ECHO Zmiany s� teraz publikowane w rejestrze NPM
CALL npm i
CALL npm run build
CALL cd dist
CALL npm publish

REM wylogowuje ############################################################
CALL npm logout

ECHO.
ECHO Nacisnij aby zakończyć
pause >nul
cd ..
