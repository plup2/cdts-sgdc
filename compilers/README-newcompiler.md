# Compiling the CDTS Soy Templates

>**NOTE: This readme applies to the newer version of the compiler, which as of this writing we decided against using for the time being. See compilers/README.md for details.**

>**NOTE: The `Grunfile.js` must be configured differently when usign the new compiler, see Gruntfile-newcompiler.js for an example.**

Two things are needed to compile the CDTS template Soy files:
  - The Google SOY compiler and its Javascript libraries
  - The Google Closure Library and its Javascript libraries
  
The goal of this README is to provide information of these compilers and locations to check for the latest version for each of the components mentioned above.

## Migrating Source Code From Legacy Compiler

With the new compiler, a few changes must be made to the SOY files:

### Parameter Definition/Documentation

**Before:**
```
/*
 * This is all of the html to be included in the body.
 *
 * @param? nameEng The English name of your web asset.
 */
{template .splash}
...
```

**After:**
```
/**
 * This is all of the html to be included in the body.
 */
{template .splash}
 {@param? nameEng: ?} /** The English name of your web asset. */
...
```

### foreach -> for

**Before:**
```
{foreach $link in $privacyLink}
    ...
{/foreach}
```

**After:**
```
{for $link in $privacyLink}
    ...
{/for}
```

### Global Browser Variables must be explictely accessed through SOY function

**Before:**
```
{let $lang: navigator.language /}
```

**After:**
```
{let $lang: unknownJsGlobal('navigator.language') /}
```

## Google SOY Compiler/Library

For the first step in compiling the SOY files, the Google SOY compiler takes SOY files as input and produces Javascript files.
While these Javascript files could be used directly in the past (along with a provided "soyutils.js" file), it is no longer the case with the newest version of the compiler.
The generated Javascript files, along with a few SOY libraries, now must be further compiled by the Google Closure Compiler (see next section).

**Both the compiler (must be named `SoyToJsSrcCompiler.jar`) and libraries (`jssrc_js.jar`) must be downloaded/updated manually and put in the `compilers` directory.**

### Invoking

The SOY compiler is invoked from `Grunfile.js` using the `grunt-run-java` module, by the `compile-soy` and `i18n-soy` tasks.

**Note**: There is a module called `grunt-soy-compile` but it has a bug when dealign with translation and multiple input files, which is why we're using the `grunt-run-java` module instead.

### Links

  - **To download latest version of compiler and libraries:** https://repo1.maven.org/maven2/com/google/template/soy/
  - **To download the original/legacy version of the compiler and soyutils.js:** https://code.google.com/archive/p/closure-templates/downloads?page=1
  - **Github Project:** https://github.com/google/closure-templates
  - **Documentation:** https://github.com/google/closure-templates/tree/master/documentation
  - **Run-java Module:** https://www.npmjs.com/package/grunt-run-java

  
## Google Closure Compiler/Library

The Closure Compiler takes the Javascript files produced by the SOY compiler, along with SOY libraries and Google Closure libraries, and produces a single Javascript file 
containing all dependencies that can be used directly.

Both the Closure compiler and library are pulled in as Node package dependencies (`google-closure-compiler` and `google-closure-library`), there is no need for manual download.

### Invoking

The Closure compiler is invoked from `Gruntfile.js` using the `google-closure-compiler` module. 

If you need to invoke manually (for troubleshooting or research), the compiler can be downloaded from the link below. Sample invocation:
```
java -jar <path to compiler>/closure-compiler-v20210302.jar --dependency_mode PRUNE --js node_modules/google-closure-library --js ./<path to extracted jssrc_js.jar>/soyutils_usegoog.js --js ./<path to extracted jssrc_js.jar>/checks.js --js ./tmp/gcweb/wet-en.js --entry_point ./tmp/gcweb/wet-en.js
```

### Links

  - Download (only needed if invoking manually): https://repo1.maven.org/maven2/com/google/javascript/closure-compiler/
  - **Github Project:** https://github.com/google/closure-library
  - **Grunt Module:** https://github.com/google/closure-compiler-npm/blob/master/packages/google-closure-compiler/docs/grunt.md
  - **Documentation:**
    - General: https://developers.google.com/closure/library
    - API Doc: https://google.github.io/closure-library/api/