import { Component } from "react";
import axios from "axios";

export default class SiteMap extends Component {
  static async getInitialProps({ req, res }) {
    if (res) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/sitemap`);

      res.setHeader("Content-Type", "text/xml");
      res.write(data);
      res.end();
    }
  }
}
