@echo off
cd /d %~dp0
regsvr32 kafra.dll
regsvr32 skype4com.dll