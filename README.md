# GalleryApp — React + Vite + TypeScript (Unsplash Gallery)

A clean, production-style photo gallery built with React (Vite + TS).  
Features: two pages (Home, History), live search with debounce, **request caching**, **search history**, **custom infinite scroll**, and an **image modal** with likes/views/downloads. Uses the official [Unsplash API](https://unsplash.com/documentation).

---

## ✨ Features

1. **ორი გვერდი** — „მთავარი“ (`/`) და „ისტორია“ (`/history`).
2. **მთავარი** — აჩვენებს **20 ყველაზე პოპულარულ** ფოტოს (`/photos?order_by=popular`).
3. **Live ძებნა** — ტექსტში ჩაწერისას სიას ავტომატურად აახლებს (debounce, ღილაკი არ არის).
4. **ქეშირება** — როგორც კი მოძებნი ( მაგალითად, `home → car → home` ), უკვე ნანახი გვერდები იტვირთება ქეშიდან.
5. **ისტორია** — ინახება ყველა ძიების სიტყვა; დაწკაპუნებით ნახავ შესაბამის შედეგებს.
6. **Infinite scroll** — როგორც მთავარზე, ასევე ისტორიაზეც.
7. **მოდალი** — სრულ ზომაში სურათი + **likes / views / downloads** + **download** ღილაკი.
8. **TypeScript** ყველგან; **არ არის მზა UI ბიბლიოთეკები** (MUI/Antd/Bootstrap).

---

## 🧱 Tech Stack

- **React**, **TypeScript**, **Vite**
- **react-router-dom** (routing)
- **IntersectionObserver** (custom infinite scroll)
- Custom **cache layer** (in-memory + `sessionStorage`)
- **localStorage** (search history)
- Typed API client for Unsplash
