import { test, expect } from "@playwright/test";
import { loginWith, createBlog } from "./helper";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Gin Fei",
        username: "Gin",
        password: "jin1212",
      },
    });

    await page.goto("http://localhost:5173/");
  });

  // @ts-check
  test("login form is shown", async ({ page }) => {
    await expect(page.getByText("Login to view Blogs")).toBeVisible();
  });

  test.describe("login", () => {
    // @ts-check
    test("succeds with correct credentials", async ({ page }) => {
      await loginWith(page, "Gin", "jin1212");
      await expect(page.getByText("Gin Fei logged in")).toBeVisible();
    });

    // @ts-check
    test("fails with incorrect credentials", async ({ page }) => {
      await loginWith(page, "Jon", "jon2020");
      await expect(page.getByText("Cannot login")).toBeVisible();
    });
  });

  test.describe("when logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "Gin", "jin1212");
      await expect(page.getByText("Gin Fei logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "Gin hit his head",
        "Gin Fei",
        "hit.head.com",
        "33"
      );

      await expect(
        page.getByText("Gin hit his head by - Gin Fei.")
      ).toBeVisible();
    });

    test.describe("and a new blog exists", () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "Note by playwright",
          "Gin Fei",
          "gin.playwright.com",
          "2"
        );
      });

      test("a blog can be liked", async ({ page }) => {
        const detailsBtn = page.getByRole("button", { name: "Details" }).last();
        await detailsBtn.click();
        const likeButton = page.getByTestId("likeBtn").last();
        await likeButton.click();
        await expect(page.getByText("Liked successfully")).toBeVisible();
      });

      test("a blog can be deleted", async ({ page }) => {
        const detailsBtn = page.getByRole("button", { name: "Details" }).last();
        await detailsBtn.click();
        const deleteBtn = page.getByTestId("deleteBtn").last();
        await deleteBtn.click();

        page.on("dialog", async (dialog) => {
          console.log(`Dialog message: ${dialog.message()}`);
          await dialog.accept();
        });
        await expect(page.getByText("Note by playwright")).not.toBeVisible();
      });

      test("only the creator sees the delete button", async ({ page }) => {
        await expect(
          page.getByRole("button", { name: "Delete" })
        ).toBeVisible();

        // Log out and log in as another user
        await page.getByText("Log out").click();
        await page.fill('input[name="username"]', "anotheruser");
        await page.fill('input[name="password"]', "anotherpassword");
        await page.click('button[type="submit"]');

        await expect(
          page.getByRole("button", { name: "Delete" })
        ).not.toBeVisible();
      });

      test("blogs are ordered by likes", async ({ page }) => {
        // Create multiple blogs with different likes
        await createBlog(page, "Blog 1", "blog 1 author", "blog1.com", 9);
        await createBlog(page, "Blog 2", "blog 2 author", "blog2.com", 10);
        await createBlog(page, "Blog 3", "blog 3 author", "blog3.com", 11);

        // Verify the order
        const blogs = await page.$$eval(".blog", (blogs) =>
          blogs.map((blog) => blog.textContent)
        );
        expect(blogs[0]).toContain("Blog 3");
        expect(blogs[1]).toContain("Blog 1");
        expect(blogs[2]).toContain("Blog 2");
      });
    });
  });
});
