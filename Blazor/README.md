# Blazor WebAssembly App

## Erstellen der Applikation

* Erstellen eines Templates für eine Blazor WebAssembly Applikation names BlazorApp

```
dotnet new blazorwasm -o BlazorApp
```

* Hinzufügen eines Templates für eine Razor-Komponente, namens
Mandelbrot in generierten Ordner Pages

```
dotnet new razorcomponent --name Test1 --output .\Pages\
dotnet new razorcomponent -n Test1 -o .\Pages\
```

## Info

## Part2

https://blazor-university.com/overview/what-is-webassembly/

* Ein Befehlssatz
* Host muss in der Lage sein dieses Befehlssatz zu interpretieren
* ... oder zu nativen Maschinencode kompilieren und auszuführen

* Ähnlich zu der Common Intermediate Language (CIL)
  * Kann von High-Level Sprachen wie C# generiert werden
  => C#-Code wird in CIL kompiliert

![Intermediate binäres Format]("./CILFormat.png")

**Browsers welche WASM unterstützen**

* From version
* Android browse From version 67
* Chrome From version   57
* Chrome for Android From version       74
* Edge  From version 16
* Firefox From version  52
* Firefox for Android From version      66
* iOS Safari From version       11
* Opera From version 44
* Opera mobile  From version 46
* Safar From version 11
* Samsung Internet      7.2

## Part1

[Doku](https://docs.microsoft.com/de-de/aspnet/core/blazor/?WT.mc_id=dotnet-35129-website&view=aspnetcore-6.0)

* Erstellen von interaktiven client-seitigen Web-Apps mit .NET Blazor WebAssembly
* Funktioniert:
  * ohne Plug-Ins 
  * ohne dass Code in anderen Sprachen neukompiliert werden muss
  * in allen modernen Browsern, einschließlich mobiler Browser
* Ausführen von .NET-Code in einem Webbrowser wird durch WebAssembly ermöglicht

WebAssembly:

* Bytecodeformat für:
  * schnelles Downloaden und maximale Ausführungsgeschwindigkeit optimiert
* Ist ein Webstandard, der in Webbrowsern ohne Plug-Ins unterstützt wird
* WebAssembly-Code kann über JavaScript auf alle Funktionen des Browsers zugreifen
  * wird als JavaScript-Interoperabilität bezeichnet (JavaScript Interop oder JS Interop)
* mit WebAssembly ausgeführter .NET Code läuft in einer JavaScript-Sandbox des Browsers ausgeführt

Phasen beim Erstellen und Ausführen von Blazor WebAssembly-App:

1. C#-Codedateien und Razor-Dateien werden in .NET-Assemblies kompiliert
2. Die Assemblies und die .NET Runtime werden in den Browser heruntergeladen
3. Blazor WebAssembly:
  * startet die .NET Runtime
  * konfiguriert die Runtime zum Laden der Assemblys für die App
* DOM-Änderungen und API-Aufrufe werden von der Blazor-WebAssembly-Runtime ÜBER JS Interop verarbeitet

Komponenten können jede Bibliothek oder API verwenden,
 die auch von JavaScript verwendet werden kann. C\#-Code kann JavaScript-Code abfragen, und JavaScript-Code kann C\#-Code abfragen.


 Erstellen von Build:

dotnet build -c Release

dotnet run -c release --no-build
