export const saveSnippetToGitHub = async (snippet, token) => {
  const { title, code } = snippet;
  const fileName = `${title.replace(/\s+/g, "_")}`;
  const fileContent = btoa(code);
  const response = await fetch(
    `https://api.github.com/repos/Mitang321/snippets/contents/${fileName}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add snippet: ${title}`,
        content: fileContent,
      }),
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to save snippet to GitHub: ${responseData.message}`
    );
  }

  return responseData;
};
