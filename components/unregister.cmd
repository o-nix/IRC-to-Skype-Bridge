@echo off
cd /d %~dp0
regsvr32 /u kafra.dll
regsvr32 /u skype4com.dll