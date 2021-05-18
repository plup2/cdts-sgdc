# Internationalization (i18n) and Localization

In the past, the English and French versions of SOY files were maintained separately. The code logic was duplicated in files `wet-en.soy` and `wet-fr.soy`, which was hard to maintain and was very error-prone. Using the message extractor provided by the SOY compiler, this process has now been changed in favor of keeping the logic in a single soy file (in the default language, English) with a transaction file to specify the French text.

The goal of this readme is to outline the process for making changes to the soy/translation files.

## Project Structure

The relevant files for i18n/localization are:
- **Gruntfile.js**: Defines the tasks to extract localization messages from the SOY file, merge/compile translation files and verify that no message goes untranslated.  To launch the localization tasks specifically, run `npm run translate` (which will run `npx grunt --stack i18n-soy`). Note that doing a build will also triggers the translation tasks.
- **src/gcweb/*.soy** and **src/gcintranet/*.soy**: appPage.soy, wet.soy and serverPage.soy files containing main logic with English text.
- **src/gcweb/wet-messages.en.xlf** and **src/gcintranet/wet-messages.en.xlf**: English "master" translation files. This files is generated automatically and does not need to be touched.  _Maintaining the English text is done directly in the SOY files._
- **src/gcweb/wet-messages.fr.xlf** and **src/gcintranet/wet-messages.fr.xlf**: French translation file. This file is automatically merged with new/changed English text.  _New messages must be translated to French for the build to succeed._
- **src/gcweb/xliffmerge.conf.json** and **src/gcintranet/xliffmerge.conf.json**: Configuration file for the translation file merge utility.

## Basic Workflow 

Making a change to the CDTS now typically consists of:

### 1. Modify the SOY file(s)

When maintaining the SOY files, text meant to be translated must be put within a `{msg...}` instruction. Example:

```html
<div>{msg desc=""}This is some English text{/msg}</div>
```

**Notes:**
- The `desc` attribute is mandatory but can be left blank. It is meant to be a description of the text for the person who will be doing the translation. As mentioned it can be blank, but should be used in ambiguous situations.  For example, if the ENGLISH file has a language switching link that must have "Français" as its text, the instruction could be `<a ...>{msg desc="Language link text, must in the opposite language"}Français{/msg}</a>`
- Text that should appear the same in all languages (for example bilingual "Government of Canada/Gouvernement du Canada") does not need to be surrounded by a `msg` instruction.
- Technically `msg` instructions can contain simple HTML elements but it should be noted that the attributes will not be translated. Example: `{msg desc=""}<div class="willNotBeTranslatable">Text that will be translated</div>{/msg}`.  If HTML element attributes have to be translated, it will require multiple messages, for example: `<a href="path/mypage-{msg desc="link language suffix"}en{/msg}.html">{msg desc=""}Text that will be translated{/msg}</a>`


### 2. Running the translation tasks

If the text of existing messages in the SOY files is changed, or new messages are added, new message entries will be automatically added to the French translation file by the build.  Because these message will be flagged as new, the build will detect the new message(s) and fail from lack of translation.

After changing/adding text, you can run `npm run translate` instead of a full build to refresh the French translation file without having to wait for a full build cycle.

### 3. Updating French Translation Files

When running `npm run translate`, the French translation files (`src/gcweb/wet-messages.fr.xlf` and `src/gcintranet/wet-messages.fr.xlf`) will be updated with new entries. Each entry will look as follow:

```xml
...
  <trans-unit id="6419721390146820105" datatype="html">
    <source>Some English Text</source>
    <target state="new">%%Some English Text%%</target>
    <note priority="1" from="description">Value of the 'desc="..."' attribute from the msg instruction</note>
  </trans-unit>
...
```

For each entry to be translated, the following must be done:
- Update/translate the text within the `target` element (getting rid of the '%%' prefix and suffix).
- Change the value of the `state` attribute from "new" to `final`.

(all other elements should remain untouched)

**Notes:**
- In the SOY files, if multiple messages have the exact same English text, this will result in only a single entry in the translation file which will apply to all. (In other words the English text is used as the key/id).
- Since the English text is used as the key/id, changing existing English text in the SOY files will result in a new entry in the translation file, with the old text/entry preserved for reference.
- These preserved obsolete entries (from changed English text) will be detected by the build and warnings will be issued for them.  **These entries should be removed when no longer needed.**

### 4. Build

Once all entries in the French translation have been translated and marked as "final", builds can be done normally (ie `npm run build` or `npm run build-prod`)

## Running CDTS Development/Watch Server

When running the development server (`npm run serve` or `npm run serve-nobuild`), the message extraction and translation file merge scripts will run automatically when the SOY files are modified (and the Javascript files rebuilt if the translation files are modified), but the "watch" will not fail or issue warnings for untranslated messages.  This is to allow unimpeded development in the default (English) language. Doing a "real" build WILL fail if there are any untranslated messages found.  

## 2-files Method vs 3-files Method

### 2-files Method

The process described above uses 2 translation files: `wet-messages.en.xlf` and `wet-messages.fr.xlf`.  The `wet-messages.en.xlf` file acts as the "master" file and should not be updated manually.  The `wet-messages.fr.xlf` file contains the French translations and the only file that needs to be updated when translating.

We chose to do it this way because it has the advantage of allowing us to worry only about the SOY file and the French translation file.  Because the English text is used as the key/id, we can work on the SOY files directly and worry about translation files only for French, which makes it easier to maintain.

This does however have a drawback: Because the English text is used as the key, it makes impossible to translate 2 English messages with exactly the same text into 2 different French texts (if somehow an English phrase could lead to 2 different French phrases depending on some context).

### 3-files Method

If the need ever arises to translate the same English text into 2 or more French different, we can relatively easily switch to using 3 translation files.

The 3 translation files would be: `wet-message.xlf` - the "master" file which should not be updated manually, `wet-messages.en.xlf` - the translation file that must be updated with English text and `wet-messages.fr.xlf` - the translation file that must be updated with French text.

Under this scenario, the SOY files' text act as keys, with the English text maintained in `wet-messages.en.xlf`. (That being said if the `target` elements in the translation file are empty, the compiler will use the text from the SOY file).  It is then possible to have the English text be the same in English but not in French by specifying 2 different keys in the SOY files.

To switch to using 3 files:
- Modify `Grunfile.js` `run_java:extractmsg-*` tasks to write to `wet-messages.xlf` instead of `wet-messages.en.xlf`
- Modify `xliffmerge.conf.json` files to configure `i18nFile` to be `wet-messages.xlf` and `languages` to `["en", "fr"]`

## Links/References

- https://github.com/google/closure-templates/blob/master/documentation/dev/localization.md
- https://github.com/martinroob/ngx-i18nsupport/tree/master/projects/xliffmerge
