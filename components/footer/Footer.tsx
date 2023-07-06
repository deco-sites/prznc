import Logo from "$store/components/footer/Logo.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Social from "$store/components/footer/Social.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
import PoweredBy from "$store/components/footer/PoweredBy.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import BackToTop from "$store/components/footer/BackToTop.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import LimitedDiv from "$store/components/LimitedDiv.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: LiveImage;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo
    ? <></>
    : <Logo social={social} logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      tiled={layout?.variation == "Variation 4" ||
        layout?.variation == "Variation 5"}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _apps = layout?.hide?.mobileApps
    ? <></>
    : <MobileApps content={mobileApps} />;
  const _region = layout?.hide?.regionOptions
    ? <></>
    : <RegionSelector content={regionOptions} />;
  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;

  return (
    <>
      <LimitedDiv baseClass={ColorClasses(layout)} class="flex flex-col py-10">
        <div class="lg:container mx-6 lg:mx-auto">
          {(!layout?.variation || layout?.variation == "Variation 1") && (
            <div class="flex flex-col gap-10">
              <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
                {_logo}
                {_sectionLinks}

                <ul class="hidden md:flex flex-row gap-6 lg:gap-10">
                  <li>
                    <div class="flex flex-col gap-2">
                      <span class="text-sm font-bold">
                        0800 720 1111
                      </span>
                      <ul class="flex flex-col gap-2 flex-wrap text-sm">
                        <li class="font-bold">Horário de atendimento:</li>
                        <li>Segunda à Sexta: 8h às 20h</li>
                        <li>Sábados: 8h às 18h</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="text-xs text-[#525252]">
                <p class="mb-4">
                  <b>Condições gerais:</b>{" "}
                  Em caso de divergência de valores, o valor válido é o do
                  carrinho de compras. Fotos ilustrativas. Compras sujeitas a
                  confirmação de estoque. Compras podem ser canceladas em caso
                  de suspeita de fraude. A fim de garantir o acesso de um maior
                  número de clientes as nossas promoções, a compra de produtos
                  com preços promocionais poderá ter sua quantidade limitada por
                  cliente. Os preços, ofertas e condições são exclusivos para o
                  e-commerce e válidos durante o dia de hoje, podendo sofrer
                  alterações sem prévia notificação. Proibida a venda de bebidas
                  alcoólicas para menores de 18 anos, conforme Lei n.º 8069/90,
                  art. 81, inciso II (Estatuto da Criança e do Adolescente).
                  Preços e condições exclusivos para o www.prezunic.com.br,
                  podendo sofrer alterações sem aviso prévio. O valor mínimo
                  para as compras on-line é de R$ 50,00.
                </p>

                <p>© 2023 Copyright. Todos os direitos reservados Prezunic.</p>
              </div>
            </div>
          )}
          {layout?.variation == "Variation 2" && (
            <div class="flex flex-col gap-10">
              <div class="flex flex-col md:flex-row gap-10">
                <div class="flex flex-col gap-10 lg:w-1/2">
                  {_logo}
                  {_social}
                  {_payments}
                  {_apps}
                  {_region}
                </div>
                <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                  {_newsletter}
                  {_sectionLinks}
                </div>
              </div>
              <Divider />
              <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
                <PoweredBy />
                {_links}
              </div>
            </div>
          )}
          {layout?.variation == "Variation 3" && (
            <div class="flex flex-col gap-10">
              {_logo}
              <div class="flex flex-col lg:flex-row gap-14">
                <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                  {_newsletter}
                  <div class="flex flex-col gap-10">
                    {_payments}
                    {_apps}
                  </div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                  <div class="flex flex-col md:flex-row gap-10">
                    {_sectionLinks}
                    {_social}
                  </div>
                  {_region}
                </div>
              </div>
              <Divider />
              <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
                <PoweredBy />
                {_links}
              </div>
            </div>
          )}
          {layout?.variation == "Variation 4" && (
            <div class="flex flex-col gap-10">
              {_newsletter}
              {layout?.hide?.newsletter ? <></> : <Divider />}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
                {_sectionLinks}
                <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                  <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                    <div class="lg:flex-auto">
                      {_payments}
                    </div>
                    <div class="lg:flex-auto">
                      {_social}
                    </div>
                  </div>
                  <div class="flex flex-col gap-10 lg:gap-10">
                    {_region}
                    {_apps}
                  </div>
                </div>
              </div>
              <Divider />
              <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
                {_logo}
                <PoweredBy />
              </div>
            </div>
          )}
          {layout?.variation == "Variation 5" && (
            <div class="flex flex-col gap-10">
              {_newsletter}
              {layout?.hide?.newsletter ? <></> : <Divider />}
              {_logo}
              <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
                {_sectionLinks}
                <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                  {_payments}
                  {_social}
                  {_apps}
                </div>
              </div>
              <Divider />
              <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
                <PoweredBy />
                <div class="flex flex-col md:flex-row gap-10 md:items-center">
                  {_links}
                  {_region}
                </div>
              </div>
            </div>
          )}
        </div>
        {layout?.hide?.backToTheTop
          ? <></>
          : <BackToTop content={backToTheTop?.text} />}
      </LimitedDiv>

      <LimitedDiv baseClass="bg-white" class="p-4 text-xs text-[#525252]">
        <b>Cencosud Brasil Comercial SA.</b>{" "}
        CNPJ sob n° 39.346.861/0350-38 . Sediada na Av. das Nações Unidas,
        12.995, 21º andar, CEP: 04.578-000, Bairro Brooklin Paulista, na cidade
        de São Paulo - SP.
      </LimitedDiv>
    </>
  );
}

export default Footer;
