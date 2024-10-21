<script lang="ts">
  import { goto } from "$app/navigation";

  export let data: {
    languages: { Language: string; Year: number; Ranking: number }[];
    notFoundLanguages: string[];
    languagesToQueryStr: string;
  };

  let errorMessage = "";

  // Initialize variables from the data provided by the load function
  let languages = data.languages;
  let notFoundLanguages = data.notFoundLanguages;

  // Initialize 'languagesToQueryStr' from the data
  let languagesToQueryStr = data.languagesToQueryStr;
  let userHasModifiedInput = false; // Flag to track if the user has modified the input

  // Watch for changes in data.languagesToQueryStr and update languagesToQueryStr if the user hasn't modified it
  $: if (
    !userHasModifiedInput &&
    languagesToQueryStr !== data.languagesToQueryStr
  ) {
    languagesToQueryStr = data.languagesToQueryStr;
  }

  // Function to parse the input string into an array of languages
  function parseLanguages(input: string): string[] {
    return input
      .split(",")
      .map((lang) => lang.trim())
      .filter(Boolean);
  }

  // Function to handle the search when the button is clicked
  function fetchLanguages() {
    const languagesToQuery = parseLanguages(languagesToQueryStr);

    if (languagesToQuery.length === 0) {
      languages = [];
      notFoundLanguages = [];
      errorMessage = "Please enter at least one language.";
      return;
    }

    errorMessage = "";
    userHasModifiedInput = false; // Reset the flag after fetching

    const query = new URLSearchParams({
      languages: languagesToQuery.join(","),
    });

    // Update the URL with the query parameters
    goto(`?${query.toString()}`, { replaceState: true });
    // The load function will automatically run and update the data
  }

  // Handle input change
  function onInputChange() {
    userHasModifiedInput = true;
  }

  // Make variables reactive to update when 'data' changes
  $: languages = data.languages;
  $: notFoundLanguages = data.notFoundLanguages;
</script>

<p>In this page, the main aim is to use SQL to show the same data as 'multi'</p>

<!-- Input field for the user to enter languages -->
<label for="languages-input">Enter languages separated by commas:</label>
<input
  id="languages-input"
  type="text"
  bind:value={languagesToQueryStr}
  placeholder="JavaScript, Python, C++, PHP"
  on:input={onInputChange}
/>

<!-- Button to trigger the fetchLanguages function -->
<button on:click={fetchLanguages}>Fetch Languages</button>

<!-- Display any error messages -->
{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{/if}

<!-- Display the language data -->
<h1>Language Data</h1>
{#if languages.length > 0}
  <ul>
    {#each languages as { Language, Year, Ranking }}
      <li>{Language}: Year {Year}, Ranking {Ranking}</li>
    {/each}
  </ul>
{/if}

<!-- Display languages not found -->
{#if notFoundLanguages.length > 0}
  <h2>Not Found Languages</h2>
  <ul>
    {#each notFoundLanguages as lang}
      <li>{lang} - Not a language</li>
    {/each}
  </ul>
{/if}
